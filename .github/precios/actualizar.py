# Actualiza los precios de los vuelos de la web prep · Agencia de Viajes SiempreLab
# Consulta Google Vuelos (librería fast-flights) y escribe agencia/prep/precios.json.
# Lo corre GitHub Actions dos veces al día (.github/workflows/precios.yml).
# Los id de VUELOS tienen que ser los mismos de datos.js.

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

from fast_flights import FlightData, Passengers, TFSData, get_flights_from_filter

SALIDA = Path(__file__).resolve().parents[2] / 'agencia' / 'prep' / 'precios.json'

# Cada vuelo: tipo ('ida' = solo ida, 'ida-vuelta'), ruta, fechas, aerolínea y hora de salida
# (y de llegada si hay dos vuelos que salen a la misma hora).
VUELOS = [
    # Austral: se compran por tramo
    {'id': 'au-ida-1257', 'tipo': 'ida', 'o': 'SCL', 'd': 'BBA', 'fecha': '2026-12-13', 'aerolinea': 'LATAM', 'sale': '12:57'},
    {'id': 'au-ida-1430', 'tipo': 'ida', 'o': 'SCL', 'd': 'BBA', 'fecha': '2026-12-13', 'aerolinea': 'LATAM', 'sale': '14:30'},
    {'id': 'au-v23-1500', 'tipo': 'ida', 'o': 'BBA', 'd': 'SCL', 'fecha': '2026-12-23', 'aerolinea': 'LATAM', 'sale': '15:00', 'llega': '18:41'},
    {'id': 'au-v23-1525', 'tipo': 'ida', 'o': 'BBA', 'd': 'SCL', 'fecha': '2026-12-23', 'aerolinea': 'LATAM', 'sale': '15:25'},
    {'id': 'au-v24-1500', 'tipo': 'ida', 'o': 'BBA', 'd': 'SCL', 'fecha': '2026-12-24', 'aerolinea': 'LATAM', 'sale': '15:00', 'llega': '18:30'},
    {'id': 'au-v24-1418', 'tipo': 'ida', 'o': 'BBA', 'd': 'SCL', 'fecha': '2026-12-24', 'aerolinea': 'LATAM', 'sale': '14:18'},
    # Guatemala: ida y vuelta (el precio es con la vuelta más barata del 9 ene)
    {'id': 'copa-26', 'tipo': 'ida-vuelta', 'o': 'SCL', 'd': 'GUA', 'fecha': '2026-12-26', 'vuelta': '2027-01-09', 'aerolinea': 'COPA', 'sale': '01:07', 'llega': '09:40'},
    {'id': 'copa-26-0845', 'tipo': 'ida-vuelta', 'o': 'SCL', 'd': 'GUA', 'fecha': '2026-12-26', 'vuelta': '2027-01-09', 'aerolinea': 'COPA', 'sale': '01:07', 'llega': '08:45'},
    {'id': 'copa-27', 'tipo': 'ida-vuelta', 'o': 'SCL', 'd': 'GUA', 'fecha': '2026-12-27', 'vuelta': '2027-01-09', 'aerolinea': 'COPA', 'sale': '01:31'},
    {'id': 'avianca-26', 'tipo': 'ida-vuelta', 'o': 'SCL', 'd': 'GUA', 'fecha': '2026-12-26', 'vuelta': '2027-01-09', 'aerolinea': 'Avianca', 'sale': '16:15'},
    # Vuelo interno a Flores (el más barato del día)
    {'id': 'flores', 'tipo': 'ida', 'o': 'GUA', 'd': 'FRS', 'fecha': '2027-01-02', 'aerolinea': 'Avianca', 'sale': None},
]


def hora24(texto):
    """'1:07 AM on Sat, Dec 26' → '01:07'"""
    m = re.match(r'\s*(\d{1,2}):(\d{2})\s*([AP]M)', texto or '')
    if not m:
        return None
    h, mi, ap = int(m.group(1)), m.group(2), m.group(3)
    if ap == 'PM' and h != 12:
        h += 12
    if ap == 'AM' and h == 12:
        h = 0
    return f'{h:02d}:{mi}'


def duracion(texto):
    """'11 hr 33 min' → '11 h 33 min'"""
    return (texto or '').replace(' hr', ' h').strip()


def precio(texto):
    digitos = re.sub(r'\D', '', texto or '')
    return int(digitos) if digitos else None


def buscar(v):
    tramos = [FlightData(date=v['fecha'], from_airport=v['o'], to_airport=v['d'])]
    if v['tipo'] == 'ida-vuelta':
        tramos.append(FlightData(date=v['vuelta'], from_airport=v['d'], to_airport=v['o']))
    filtro = TFSData.from_interface(
        flight_data=tramos,
        trip='round-trip' if v['tipo'] == 'ida-vuelta' else 'one-way',
        passengers=Passengers(adults=1),
        seat='economy',
    )
    resultado = get_flights_from_filter(filtro, currency='CLP')
    candidatos = []
    for f in resultado.flights:
        if v['aerolinea'].lower() not in (f.name or '').lower():
            continue
        if v.get('sale') and hora24(f.departure) != v['sale']:
            continue
        if v.get('llega') and hora24(f.arrival) != v['llega']:
            continue
        p = precio(f.price)
        if p:
            candidatos.append((p, f))
    if not candidatos:
        return None
    p, f = min(candidatos, key=lambda c: c[0])
    return {'precio': p, 'dur': duracion(f.duration), 'escalas': f.stops}


def main():
    antes = {}
    if SALIDA.exists():
        antes = json.loads(SALIDA.read_text(encoding='utf-8')).get('vuelos', {})

    ahora = datetime.now(timezone.utc)
    hoy = ahora.astimezone(ZoneInfo('America/Santiago')).strftime('%Y-%m-%d')  # fecha de Chile
    vuelos = {}
    fallas = 0
    for v in VUELOS:
        previo = antes.get(v['id'], {})
        historial = previo.get('historial', [])
        try:
            r = buscar(v)
        except Exception as e:  # Google cambió algo o bloqueó: se deja lo anterior
            print(f"{v['id']}: error {e}", file=sys.stderr)
            r = None
        if r is None:
            fallas += 1
            if previo:
                previo['sinDato'] = ahora.isoformat(timespec='minutes')
                vuelos[v['id']] = previo
            print(f"{v['id']}: sin dato")
            continue
        # Un punto por día en el historial (el último del día manda)
        historial = [h for h in historial if h[0] != hoy] + [[hoy, r['precio']]]
        vuelos[v['id']] = {**r, 'visto': ahora.isoformat(timespec='minutes'), 'historial': historial[-60:]}
        print(f"{v['id']}: {r['precio']} · {r['dur']}")

    if fallas == len(VUELOS):
        print('No se pudo leer ningún precio: no se toca el archivo.', file=sys.stderr)
        sys.exit(1)

    datos = {'actualizado': ahora.isoformat(timespec='minutes'), 'fuente': 'Google Vuelos', 'vuelos': vuelos}
    SALIDA.write_text(json.dumps(datos, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()

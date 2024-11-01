import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BasicInfo() {
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [zone, setZone] = useState('07105'); // Valor inicial para la única opción de zona
  const [invoiceCode, setInvoiceCode] = useState('');
  const [rejectionCode, setRejectionCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navega a ProductDetails y pasa la información de BasicInfo
    navigate('/product-details', {
      state: { eventType, date, zone, invoiceCode, rejectionCode }
    });
  };

  return (
    <div>
      <h1 class="formulario">Formulario Eventualidad</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventType">Motivo</label>
        <select
          id="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        >
          <option value="">Seleccione el motivo</option>
          <option value="return">Devolución</option>
          <option value="rejection">Rechazo</option>
        </select>

        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="zone">Zona</label>
        <select
          id="zone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          required
        >
          <option value="07105">Seleccione su zona</option>  
          <option value="07105">07105</option>
        </select>

        <label htmlFor="invoiceCode">Código de factura</label>
        <input
          type="text"
          id="invoiceCode"
          value={invoiceCode}
          onChange={(e) => setInvoiceCode(e.target.value)}
          required
        />

        <label htmlFor="rejectionCode">Código del evento</label>
        <input
          type="text"
          id="rejectionCode"
          value={rejectionCode}
          onChange={(e) => setRejectionCode(e.target.value)}
          required
        />

        <button class="next"type="submit">Siguiente</button>
      </form>
    </div>
  );
}

export default BasicInfo;

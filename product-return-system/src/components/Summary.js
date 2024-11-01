import React from 'react';
import { useLocation } from 'react-router-dom';

function Summary() {
  const location = useLocation();
  const products = location.state?.products || [];

  const totalGeneralSinIVA = products.reduce(
    (acc, product) => acc + product.quantity * product.priceWithoutTax,
    0
  );

  const totalIVA = products.reduce(
    (acc, product) => acc + product.quantity * product.priceWithoutTax * (product.iva / 100),
    0
  );

  const totalImpuestoAdicional = products.reduce(
    (acc, product) =>
      acc + product.quantity * product.priceWithoutTax * (product.additionalTax / 100),
    0
  );

  const totalConImpuestos = totalGeneralSinIVA + totalIVA + totalImpuestoAdicional;

  return (
    <div>
      <h1>Resumen</h1>
      <h2>Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Código SAP</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio Unitario Sin IVA</th>
            <th>Total Sin IVA</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const totalWithoutTax = product.quantity * product.priceWithoutTax;
            return (
              <tr key={index}>
                <td>{product.code}</td>
                <td>{product.product}</td> 
                <td>{product.quantity}</td>
                <td>{product.priceWithoutTax}</td>
                <td>{totalWithoutTax.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3>Total General Sin IVA: {totalGeneralSinIVA.toFixed(2)}</h3>
      <h3>Total IVA: {totalIVA.toFixed(2)}</h3>
      <h3>Total Impuesto Adicional: {totalImpuestoAdicional.toFixed(2)}</h3>
      <h3>Total con Impuestos: {totalConImpuestos.toFixed(2)}</h3>
    </div>
  );
}

export default Summary;

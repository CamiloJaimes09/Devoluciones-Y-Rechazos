import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriesAndProducts from '../components/Stock';
import Select from 'react-select'; // Necesario para la lista con búsqueda

function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [priceWithoutTax, setPriceWithoutTax] = useState('');
  const [iva, setIva] = useState('19'); // IVA predeterminado 19%
  const [additionalTax, setAdditionalTax] = useState('0'); // Otro impuesto predeterminado 0%
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = { category, product, code, quantity, priceWithoutTax, iva, additionalTax };

    if (editingIndex !== null) {
      const updatedProducts = products.map((prod, index) =>
        index === editingIndex ? newProduct : prod
      );
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setCategory('');
    setProduct('');
    setCode('');
    setQuantity('');
    setPriceWithoutTax('');
    setIva('19');
    setAdditionalTax('0');
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setCategory(productToEdit.category);
    setProduct(productToEdit.product);
    setCode(productToEdit.code);
    setQuantity(productToEdit.quantity);
    setPriceWithoutTax(productToEdit.priceWithoutTax);
    setIva(productToEdit.iva);
    setAdditionalTax(productToEdit.additionalTax);
    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = () => {
    navigate('/summary', { state: { products } });
  };

  const filteredProducts = categoriesAndProducts[category] || [];

  const productOptions = filteredProducts.map((prod) => ({
    value: prod.name,
    label: prod.name,
    code: prod.code,
  }));

  const handleProductChange = (selectedOption) => {
    setProduct(selectedOption.label);
    setCode(selectedOption.code);
  };

  return (
    <div>
      <h1 class="detalles">Detalles de producto</h1>
      <form onSubmit={handleAddProduct}>
        {/* Seleccionar la categoría */}
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Seleccione una categoría</option>
          {Object.keys(categoriesAndProducts).map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Mostrar los productos relacionados con la categoría seleccionada y búsqueda */}
        <label htmlFor="product">Producto:</label>
        <Select
          id="product"
          options={productOptions}
          onChange={handleProductChange}
          isSearchable
          placeholder="Buscar producto"
        />

        {/* Mostrar el código relacionado con el producto */}
        <label htmlFor="code">Código:</label>
        <input type="text" id="code" value={code} readOnly />

        <label htmlFor="quantity">Cantidad:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label htmlFor="priceWithoutTax">Precio Unitario Sin IVA:</label>
        <input
          type="number"
          id="priceWithoutTax"
          value={priceWithoutTax}
          onChange={(e) => setPriceWithoutTax(e.target.value)}
          required
        />

        <label htmlFor="iva">IVA (%):</label>
        <input
          type="number"
          id="iva"
          value={iva}
          onChange={(e) => setIva(e.target.value)}
          required
        />

        <label htmlFor="additionalTax">Impuesto Adicional (%):</label>
        <input
          type="number"
          id="additionalTax"
          value={additionalTax}
          onChange={(e) => setAdditionalTax(e.target.value)}
          required
        />

        <button type="submit">
          {editingIndex !== null ? 'Guardar Cambios' : 'Añadir Producto'}
        </button>
      </form>

      <h2 class="productos">Productos Agregados</h2>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Producto</th>
            <th>Código</th>
            <th>Cantidad</th>
            <th>Precio Unitario Sin IVA</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={index}>
              <td>{prod.category}</td>
              <td>{prod.product}</td>
              <td>{prod.code}</td>
              <td>{prod.quantity}</td>
              <td>{prod.priceWithoutTax}</td>
              <td>
                <button onClick={() => handleEditProduct(index)}>Editar</button>
                <button onClick={() => handleDeleteProduct(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length > 0 && (
        <button onClick={handleSubmit}>Generar Resumen</button>
      )}
    </div>
  );
}

export default ProductDetails;

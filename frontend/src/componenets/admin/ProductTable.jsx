import { Edit, Trash2 } from "lucide-react";

const ProductTable = ({ products, onEdit, onDelete }) => {

  return (
    <table className="w-full bg-white rounded-xl">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>${p.price}</td>
            <td>{p.stock}</td>
            <td className="flex gap-2">
              <Edit onClick={() => onEdit(p)} />
              <Trash2 onClick={() => onDelete(p.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

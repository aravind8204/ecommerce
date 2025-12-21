import { X, Save } from "lucide-react";

const ProductModal = ({
  editingProduct,
  productForm,
  setProductForm,
  handleSaveProduct,
  setShowProductModal
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={() => setShowProductModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Sports">Sports</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              value={productForm.stock}
              onChange={(e) =>
                setProductForm({ ...productForm, stock: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={productForm.status}
              onChange={(e) =>
                setProductForm({ ...productForm, status: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSaveProduct}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editingProduct ? "Update" : "Save"}
            </button>

            <button
              onClick={() => setShowProductModal(false)}
              className="flex-1 bg-gray-200 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

import { Edit, Trash2, Plus } from "lucide-react";
import ProductModal from "./ProductModal";
import {useState} from "react";
import { useAdmin } from "../../context/AdminContext";


const ProductTable = ({
  products,
  setProducts,
  getStatusColor,
  searchQuery
}) => {

  const {addProduct,updateProduct,deleteProduct} = useAdmin();

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
      title: '',
      description:'',
      image:'',
      category: '',
      price: '',
    });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      description:'',
      image:'',
      category: '',
      price: '',
    });
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      description:product.description,
      image:product.image,
      category: product.category,
      price: product.price,
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.title || !productForm.description || !productForm.image || !productForm.category || !productForm.price ) {
      alert('Please fill all fields');
      return;
    }

    if (editingProduct) {
      const data = {
        title: productForm.title,
        description:productForm.description,
        image:productForm.image,
        category: productForm.category,
        price: parseFloat(productForm.price)}
      updateProduct({id:editingProduct._id,data});
      alert('Product updated successfully!');
    } else {
      const newProduct = {
        ...productForm,
        price: parseFloat(productForm.price),
      };
      addProduct(newProduct)
      alert('Product added successfully!');
    }
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct({id});
      alert('Product deleted successfully!');
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
                  <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    {showProductModal && <ProductModal 
                                                  editingProduct={editingProduct}
                                                  productForm={productForm}
                                                  setProductForm={setProductForm}
                                                  handleSaveProduct={handleSaveProduct}
                                                  setShowProductModal={setShowProductModal}/>}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
                      <p className="text-gray-600 mt-1">Manage all products in your store</p>
                    </div>
                    <button
                      onClick={handleAddProduct}
                      className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Product</span>
                    </button>
                  </div>
    
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Product</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Category</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Price</th>
                            
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((product) => (
                            <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="p-4">
                                <div className="flex items-center space-x-3">
                                  <img src={product.image} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                                  <span className="text-sm font-semibold text-gray-800">{product.title}</span>
                                </div>
                              </td>
                              <td className="p-4 text-sm text-gray-700">{product.category}</td>
                              <td className="p-4 text-sm font-semibold text-gray-800">${product.price}</td>
                              
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <button 
                                    onClick={() => handleEditProduct(product)}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
  );
};

export default ProductTable;

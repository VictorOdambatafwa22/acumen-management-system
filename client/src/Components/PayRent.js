import React, { useState, useEffect ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { TenantContext } from './TenantContext';

function PayRent() {
    const { id } = useParams();
    const tenantContext =useContext(TenantContext)
    const tenant=tenantContext.tenants.find(tenant=>tenant.id===parseInt(id))
    const [formData, setFormData] = useState({

        tenant_id: '',
        totalDue: '',
        amountPaid: '',
        balance: '',
        mpesaCode: '',
        entryDate: '',

    });

   function findTenant(){
    
    setFormData({
        tenant_id: tenant?.id,
        firstName: tenant?.firstName,
        totalDue: tenant?.arrears
  
        // Add more fields as needed
      });
   }

    useEffect(() => {
        findTenant()  
    },[id])
   

    // UseEffect logic here




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
          let updatedData = { ...prevData, [name]: value };
    
          // Update balance if AmountPaid is changing
          if (name === 'amountPaid') {
            const totalDue = parseFloat(prevData.totalDue) || 0;
            const amountPaid = parseFloat(value) || 0;
            const balance = totalDue - amountPaid;
            updatedData = { ...updatedData, balance: balance.toFixed(0) };
          }
    
          return updatedData;
        });
      };




    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        fetch('http://127.0.0.1:5556/payrents', {
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
            
            // tenantContext.UpdateTenant(data)
                // Handle the response from the API
                console.log('Success:', data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };


    return (
        <div className="container mx-auto mt-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Pay rent</h2>
            <div className="mb-4">
              <label htmlFor="tenant_id" className="block text-gray-600 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="tenant_id"
                name="tenant_id"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalDue" className="block text-gray-600 text-sm font-medium mb-2">
                Total due
              </label>
              <input
                type="text"
                id="totalDue"
                name="totalDue"
                value={formData.totalDue}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amountPaid" className="block text-gray-600 text-sm font-medium mb-2">
                Amount paid
              </label>
              <input
                type="text"
                id="amountPaid"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="balance" className="block text-gray-600 text-sm font-medium mb-2">
                Balance
              </label>
              <input
                type="text"
                id="balance"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
                readOnly
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mpesaCode" className="block text-gray-600 text-sm font-medium mb-2">
                Mpesa code
              </label>
              <input
                type="text"
                id="mpesaCode"
                name="mpesaCode"
                value={formData.mpesaCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <button
              // type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      );
    }
    
    export default PayRent;
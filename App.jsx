
import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([{ email: 'admin', password: '123' }]);
  
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', stock: 150, price: 25, expiry: '2027-05-20', category: 'Tablet', manufacturer: 'Cipla' },
    { id: 2, name: 'Azithromycin 250mg', stock: 80, price: 120, expiry: '2026-11-15', category: 'Antibiotic', manufacturer: 'Sun Pharma' },
    { id: 3, name: 'Cetirizine 10mg', stock: 200, price: 15, expiry: '2027-08-10', category: 'Allergy', manufacturer: 'Dr Reddy' },
    { id: 4, name: 'Vitamin D3 60K', stock: 45, price: 90, expiry: '2026-12-30', category: 'Supplement', manufacturer: 'Mankind' },
    { id: 5, name: 'Dolo 650mg', stock: 180, price: 30, expiry: '2027-06-14', category: 'Tablet', manufacturer: 'Micro Labs' },
  ]);

  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setCurrentUser(email);
      setPage('dashboard');
    } else {
      alert('Email and Password enter chey');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      const exists = users.find(u => u.email === email);
      if (exists) {
        alert('User already exists. Login chey');
        setPage('login');
        return;
      }
      setUsers([...users, { email, password, name }]);
      alert('Registration Successful! Login chey');
      setPage('login');
      setName('');
      setEmail('');
      setPassword('');
    } else {
      alert('Anni fields fill chey');
    }
  };

  const addToCart = (med) => {
    if (med.stock === 0) {
      alert('Out of Stock!');
      return;
    }
    const existing = cart.find(c => c.id === med.id);
    if (existing) {
      setCart(cart.map(c => c.id === med.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...med, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    const med = medicines.find(m => m.id === id);
    if (qty > med.stock) {
      alert(`Only ${med.stock} items in stock!`);
      return;
    }
    if (qty < 1) {
      setCart(cart.filter(c => c.id !== id));
      return;
    }
    setCart(cart.map(c => c.id === id ? { ...c, qty } : c));
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    setMedicines(medicines.map(med => {
      const cartItem = cart.find(c => c.id === med.id);
      if (cartItem) {
        return { ...med, stock: med.stock - cartItem.qty };
      }
      return med;
    }));
    alert(`Bill Generated Successfully!\nTotal: ₹${totalAmount}\nItems: ${cart.length}`);
    setCart([]);
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const filteredMeds = medicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
  const lowStock = medicines.filter(m => m.stock < 50).length;

  if (page === 'login') {
    return (
      <div style={{minHeight: '100vh', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
        <div style={{background: 'white', padding: '48px', borderRadius: '12px', width: '420px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)'}}>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            <h1 style={{fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0'}}>PharmaCare Pro</h1>
            <p style={{color: '#64748b', fontSize: '14px', margin: 0}}>Pharmacy Management System</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px'}}>Email or Username</label>
              <input 
                type="text" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none'}}
              />
            </div>
            <div style={{marginBottom: '24px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px'}}>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none'}}
              />
            </div>
            <button type="submit" style={{background: '#0f766e', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', width: '100%', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px'}}>
              Login
            </button>
          </form>
          
          <div style={{textAlign: 'center', fontSize: '14px', color: '#64748b'}}>
            Don't have an account? <button onClick={() => {setPage('register'); setEmail(''); setPassword('');}} style={{background: 'none', border: 'none', color: '#0f766e', fontWeight: '600', cursor: 'pointer', padding: 0}}>Register</button>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'register') {
    return (
      <div style={{minHeight: '100vh', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
        <div style={{background: 'white', padding: '48px', borderRadius: '12px', width: '420px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)'}}>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            <h1 style={{fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0'}}>Create Account</h1>
            <p style={{color: '#64748b', fontSize: '14px', margin: 0}}>Register to PharmaCare Pro</p>
          </div>
          
          <form onSubmit={handleRegister}>
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px'}}>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none'}}
              />
            </div>
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px'}}>Email</label>
              <input 
                type="text" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none'}}
              />
            </div>
            <div style={{marginBottom: '24px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px'}}>Password</label>
              <input 
                type="password" 
                placeholder="Create password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none'}}
              />
            </div>
            <button type="submit" style={{background: '#0f766e', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', width: '100%', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px'}}>
              Register
            </button>
          </form>
          
          <div style={{textAlign: 'center', fontSize: '14px', color: '#64748b'}}>
            Already have an account? <button onClick={() => {setPage('login'); setName(''); setEmail(''); setPassword('');}} style={{background: 'none', border: 'none', color: '#0f766e', fontWeight: '600', cursor: 'pointer', padding: 0}}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <div style={{background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 32px'}}>
        <div style={{maxWidth: '1400px', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{fontSize: '24px'}}>💊</span>
            <h1 style={{margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a'}}>PharmaCare Pro</h1>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <span style={{fontSize: '14px', color: '#64748b'}}>Welcome, {currentUser}</span>
            <button onClick={() => {setPage('login'); setEmail(''); setPassword(''); setCart([]); setCurrentUser('');}} style={{background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '14px'}}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth: '1400px', margin: 'auto', padding: '32px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px'}}>
          <div style={{background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
            <p style={{margin: '0 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: '500'}}>Total Medicines</p>
            <h2 style={{margin: 0, fontSize: '30px', fontWeight: '700', color: '#0f172a'}}>{medicines.length}</h2>
          </div>
          <div style={{background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
            <p style={{margin: '0 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: '500'}}>Low Stock Alert</p>
            <h2 style={{margin: 0, fontSize: '30px', fontWeight: '700', color: '#dc2626'}}>{lowStock}</h2>
          </div>
          <div style={{background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
            <p style={{margin: '0 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: '500'}}>Cart Total</p>
            <h2 style={{margin: 0, fontSize: '30px', fontWeight: '700', color: '#0f766e'}}>₹{totalAmount}</h2>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px'}}>
          <div style={{background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600', color: '#0f172a'}}>Medicine Inventory</h3>
              <input 
                type="text" 
                placeholder="Search medicine..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', outline: 'none', width: '240px'}}
              />
            </div>
            <div style={{maxHeight: '500px', overflowY: 'auto'}}>
              {filteredMeds.map((med) => (
                <div key={med.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #f1f5f9', borderRadius: '6px', marginBottom: '8px', background: med.stock < 50 ? '#fef2f2' : 'white'}}>
                  <div style={{flex: 1}}>
                    <p style={{margin: 0, fontWeight: '600', color: '#0f172a', fontSize: '14px'}}>{med.name}</p>
                    <p style={{margin: '4px 0 0 0', fontSize: '13px', color: '#64748b'}}>
                      {med.manufacturer} | Stock: <b style={{color: med.stock < 50 ? '#dc2626' : '#059669'}}>{med.stock}</b> | ₹{med.price}
                    </p>
                  </div>
                  <button onClick={() => addToCart(med)} disabled={med.stock === 0} style={{padding: '6px 14px', background: med.stock === 0 ? '#e2e8f0' : '#0f766e', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: med.stock === 0 ? 'not-allowed' : 'pointer', fontSize: '13px'}}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
            <h3 style={{margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a'}}>Billing Cart</h3>
            {cart.length === 0 ? (
              <div style={{textAlign: 'center', padding: '40px 20px', color: '#94a3b8'}}>
                <p style={{margin: 0, fontSize: '14px'}}>Cart is empty</p>
              </div>
            ) : (
              <>
                <div style={{maxHeight: '320px', overflowY: 'auto', marginBottom: '16px'}}>
                  {cart.map(item => (
                    <div key={item.id} style={{padding: '12px', border: '1px solid #f1f5f9', borderRadius: '6px', marginBottom: '8px'}}>
                      <p style={{margin: '0 0 8px 0', fontWeight: '600', color: '#0f172a', fontSize: '14px'}}>{item.name}</p>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} style={{width: '24px', height: '24px', border: '1px solid #cbd5e1', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '14px'}}>-</button>
                          <span style={{fontWeight: '500', minWidth: '20px', textAlign: 'center', fontSize: '14px'}}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} style={{width: '24px', height: '24px', border: '1px solid #cbd5e1', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '14px'}}>+</button>
                        </div>
                        <p style={{margin: 0, fontWeight: '600', color: '#0f766e', fontSize: '14px'}}>₹{item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{borderTop: '1px solid #e2e8f0', paddingTop: '16px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <span style={{fontSize: '16px', fontWeight: '600', color: '#0f172a'}}>Total:</span>
                    <span style={{fontSize: '20px', fontWeight: '700', color: '#0f766e'}}>₹{totalAmount}</span>
                  </div>
                  <button onClick={checkout} style={{background: '#0f766e', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', width: '100%'}}>
                    Generate Bill
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

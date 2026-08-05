export const dynamic = "force-dynamic";

import { supabase } from '../../lib/supabase';

export default async function RestaurantMenu({ params }) {
  // Read the subdomain name from the web URL
  const { subdomain } = await params;

  // 1. Fetch the restaurant profile from your Mother Account table
  const { data: restaurant, error: restError } = await supabase
    .from('sub_accounts')
    .select('*')
    .eq('subdomain', subdomain)
    .eq('is_active', true)
    .single();

  if (restError || !restaurant) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Restaurant Not Found</h2>
        <p>This sub-account does not exist or is inactive.</p>
      </div>
    );
  }

  // 2. Fetch the food items belonging strictly to this sub-account
  const { data: menuItems, error: menuError } = await supabase
    .from('menu_items')
    .select('*')
    .eq('sub_account_id', restaurant.id)
    .eq('is_available', true);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #E5E7EB', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', color: '#111827', margin: '0' }}>{restaurant.restaurant_name}</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: '5px 0 0' }}>Freshly prepared in Satwa, Dubai</p>
      </header>

      {/* Menu Cards List */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {menuItems && menuItems.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#FFFFFF', padding: '15px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1', paddingRight: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#EF4444', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{item.category}</span>
              <h3 style={{ fontSize: '16px', color: '#111827', margin: '0 0 4px 0', fontWeight: '600' }}>{item.name}</h3>
              <p style={{ fontSize: '13px', color: '#6B7280', margin: '0' }}>{item.description}</p>
            </div>
            <div style={{ textAlign: 'right', minWidth: '90px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{Number(item.price).toFixed(2)} AED</div>
              <button style={{ backgroundColor: '#10B981', color: '#FFFFFF', border: 'none', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
                Add +
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

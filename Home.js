const cars = [
  {id:1, brand:"Mercedes", model:"AMG GT", price:450, img:"https://images.unsplash.com/photo-1618323263726-f2447b0f8f1a?auto=format&fit=crop&w=800&q=80", desc:"Powerful and elegant driving experience."},
  {id:2, brand:"Lamborghini", model:"Huracán", price:980, img:"https://images.unsplash.com/photo-1600607682887-c2b5f76f8f2f?auto=format&fit=crop&w=800&q=80", desc:"Italian supercar with breathtaking performance."},
  {id:3, brand:"BMW", model:"M4", price:320, img:"https://images.unsplash.com/photo-1589739908858-76e73eecf2b7?auto=format&fit=crop&w=800&q=80", desc:"Sporty coupe with excellent handling."},
  {id:4, brand:"Audi", model:"R8", price:590, img:"https://images.unsplash.com/photo-1609453435340-c95f508f877e?auto=format&fit=crop&w=800&q=80", desc:"Luxury performance with quattro grip."},
  {id:5, brand:"Porsche", model:"911", price:700, img:"https://images.unsplash.com/photo-1606813903865-fac5b0b98b8f?auto=format&fit=crop&w=800&q=80", desc:"Iconic design and superb driving dynamics."},
  {id:6, brand:"Nissan", model:"GTR", price:290, img:"https://images.unsplash.com/photo-1584395630827-860eee694d7b?auto=format&fit=crop&w=800&q=80", desc:"Japanese powerhouse — tech and speed."}
];

// --- Helpers ---
function getBrands(list){
  const brands = new Set(list.map(c => c.brand));
  return ["All", ...brands];
}

// --- Render cars ---
function renderCars(list){
  const grid = document.getElementById('carsGrid');
  grid.innerHTML = '';
  if(list.length===0){
    grid.innerHTML=`<p style="grid-column:1/-1;color:#6b7280">No cars found.</p>`;
    return;
  }
  list.forEach(car=>{
    const card=document.createElement('article');
    card.className='card';
    card.innerHTML=`
      <img src="${car.img}" alt="${car.brand} ${car.model}">
      <div class="card-body">
        <h4>${car.brand} ${car.model}</h4>
        <div class="meta">${car.desc}</div>
        <div class="price">€${car.price} / day</div>
        <div class="actions">
          <button class="btn view-btn" data-id="${car.id}">View</button>
          <button class="btn btn-primary book-btn" data-id="${car.id}">Book Now</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach event listeners
  document.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id=parseInt(btn.dataset.id);
      viewDetails(id);
    });
  });
  document.querySelectorAll('.book-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id=parseInt(btn.dataset.id);
      bookNow(id);
    });
  });
}

// --- View & Book ---
function viewDetails(id){
  const car=cars.find(c=>c.id===id);
  alert(`${car.brand} ${car.model}\n\n${car.desc}\nPrice: €${car.price}/day\n\n(Frontend demo)`);
}

function bookNow(id){
  const car=cars.find(c=>c.id===id);
  const name=prompt(`Book ${car.brand} ${car.model}\nPlease enter your name:`);
  if(!name) return alert('Booking cancelled.');
  alert(`Thanks ${name}! Your booking request for ${car.brand} ${car.model} has been received (demo).`);
}

// --- Filters ---
function buildFilterButtons(){
  const container=document.getElementById('filterButtons');
  const brands=getBrands(cars);
  container.innerHTML='';
  brands.forEach(b=>{
    const btn=document.createElement('button');
    btn.className='btn';
    btn.textContent=b;
    btn.dataset.brand=b;
    btn.addEventListener('click', ()=>{
      applyFilters();
      container.querySelectorAll('.btn').forEach(x=>x.style.opacity='0.7');
      btn.style.opacity='1';
    });
    container.appendChild(btn);
  });
}

function applyFilters(){
  const search=document.getElementById('searchInput').value.trim().toLowerCase();
  const btns=document.getElementById('filterButtons').querySelectorAll('button');
  let activeBrand='All';
  btns.forEach(b=>{if(b.style.opacity==='1') activeBrand=b.dataset.brand;});

  const result=cars.filter(car=>{
    const text=(car.brand+' '+car.model+' '+car.desc).toLowerCase();
    const matchesSearch=search===''?true:text.includes(search);
    const matchesBrand=(activeBrand==='All')?true:car.brand.toLowerCase()===activeBrand.toLowerCase();
    return matchesSearch && matchesBrand;
  });

  renderCars(result);
}

// --- Init ---
window.addEventListener('DOMContentLoaded', ()=>{
  renderCars(cars);
  buildFilterButtons();
  const fb=document.getElementById('filterButtons').querySelector('button');
  if(fb) fb.style.opacity='1';

  document.getElementById('searchInput').addEventListener('input', ()=>applyFilters());
  document.getElementById('searchClear').addEventListener('click', ()=>{
    document.getElementById('searchInput').value='';
    applyFilters();
  });

  document.getElementById('year').textContent=new Date().getFullYear();
});

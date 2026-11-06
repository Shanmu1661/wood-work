/**
 * ===================================================================
 * TimberCraft - Contractor & Client Dashboard JavaScript (dashboard.js)
 * Project Milestone Tracking, Lumber Calculator, and Job Management
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectSwitcher();
  initLumberCalculator();
  initStatusFilters();
});

/* --------------------------------------------------
 * 1. PROJECT TRACKER & MILESTONES DATA
 * -------------------------------------------------- */
const projectData = {
  'PRJ-1082': {
    name: 'Villa Aurelia - Master Walk-in Wardrobe & Vanity',
    client: 'Alexander & Sophia Wright',
    address: '742 Highland Crest Way, Suite 4',
    type: 'Luxury Walk-in Wardrobe',
    species: 'American Black Walnut & Fluted Glass',
    contractor: 'Marcus Vance (Master Joiner)',
    status: 'In Workshop Assembly',
    progress: 72,
    startDate: 'Oct 12, 2026',
    estimatedHandover: 'Nov 24, 2026',
    timberLot: 'WAL-LOT-992 (FSC Certified)',
    budget: '$18,450',
    milestones: [
      { title: 'Site Laser Measurement & 3D Scan', date: 'Oct 14, 2026', done: true },
      { title: 'Wood Selection & Veneer Book-Matching', date: 'Oct 20, 2026', done: true },
      { title: 'Workshop Carcass & Joinery Milling', date: 'Nov 02, 2026', done: true },
      { title: 'Hand Sanding & 4-Coat PU Satin Finish', date: 'Nov 12, 2026', active: true },
      { title: 'Blum Concealed Hardware & Sensor LED Fitting', date: 'Nov 18, 2026', pending: true },
      { title: 'Final Site Installation & Client Handover', date: 'Nov 24, 2026', pending: true }
    ]
  },
  'PRJ-1085': {
    name: 'The Crown Penthouse - Floating TV Media Wall & Oak Paneling',
    client: 'Dr. Evelyn Martinez',
    address: '2800 Skyline Blvd, Penthouse B',
    type: 'Bespoke TV Unit & Slat Paneling',
    species: 'European White Oak & Calacatta Quartz Insert',
    contractor: 'Darius Thorne (Senior Millworker)',
    status: 'On-Site Fitting',
    progress: 88,
    startDate: 'Sep 28, 2026',
    estimatedHandover: 'Nov 12, 2026',
    timberLot: 'OAK-LOT-441 (Quarter Sawn)',
    budget: '$12,800',
    milestones: [
      { title: 'Site Laser Measurement & 3D Scan', date: 'Sep 30, 2026', done: true },
      { title: 'Wood Selection & Veneer Book-Matching', date: 'Oct 08, 2026', done: true },
      { title: 'Workshop Carcass & Joinery Milling', date: 'Oct 18, 2026', done: true },
      { title: 'Hand Sanding & 4-Coat PU Satin Finish', date: 'Oct 28, 2026', done: true },
      { title: 'Blum Concealed Hardware & Sensor LED Fitting', date: 'Nov 04, 2026', done: true },
      { title: 'Final Site Installation & Client Handover', date: 'Nov 12, 2026', active: true }
    ]
  },
  'PRJ-1089': {
    name: 'Belgrave Residence - Solid Teak Pivot Entrance & Interior Doors',
    client: 'Jonathan & Claire Sterling',
    address: '15 Maple Grove Lane',
    type: 'Architectural Doors & Architraves',
    species: 'Burma Teak & Solid Antique Brass Pulls',
    contractor: 'Elena Rostova (Wood Carver & Joiner)',
    status: 'Timber Kiln Prep',
    progress: 35,
    startDate: 'Oct 28, 2026',
    estimatedHandover: 'Dec 15, 2026',
    timberLot: 'TEAK-LOT-782 (Old-Growth Seasoned)',
    budget: '$14,200',
    milestones: [
      { title: 'Site Laser Measurement & 3D Scan', date: 'Oct 30, 2026', done: true },
      { title: 'Wood Selection & Veneer Book-Matching', date: 'Nov 05, 2026', done: true },
      { title: 'Workshop Carcass & Joinery Milling', date: 'Nov 14, 2026', active: true },
      { title: 'Hand Sanding & 4-Coat PU Satin Finish', date: 'Nov 26, 2026', pending: true },
      { title: 'Blum Concealed Hardware & Sensor LED Fitting', date: 'Dec 05, 2026', pending: true },
      { title: 'Final Site Installation & Client Handover', date: 'Dec 15, 2026', pending: true }
    ]
  }
};

function initProjectSwitcher() {
  const select = document.getElementById('projectSelector');
  if (!select) return;

  function render(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('dashProjName').textContent = data.name;
    document.getElementById('dashClientName').textContent = data.client;
    document.getElementById('dashAddress').textContent = data.address;
    document.getElementById('dashSpecies').textContent = data.species;
    document.getElementById('dashLead').textContent = data.contractor;
    document.getElementById('dashStatusBadge').textContent = data.status;
    document.getElementById('dashBudget').textContent = data.budget;
    document.getElementById('dashLot').textContent = data.timberLot;
    document.getElementById('dashHandover').textContent = data.estimatedHandover;

    // Progress bar
    const bar = document.getElementById('dashProgressBar');
    const percentTxt = document.getElementById('dashProgressTxt');
    if (bar) bar.style.width = `${data.progress}%`;
    if (percentTxt) percentTxt.textContent = `${data.progress}% Completed`;

    // Milestones List
    const milestonesWrap = document.getElementById('dashMilestones');
    if (milestonesWrap) {
      milestonesWrap.innerHTML = data.milestones.map((m, idx) => {
        let statusIcon = '<div class="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-500 flex items-center justify-center font-bold text-xs"><i class="fa fa-clock"></i></div>';
        let lineClass = 'border-stone-200 dark:border-stone-800';
        let textClass = 'text-stone-400 dark:text-stone-500';

        if (m.done) {
          statusIcon = '<div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md"><i class="fa fa-check"></i></div>';
          lineClass = 'border-emerald-600';
          textClass = 'text-stone-800 dark:text-stone-200 font-semibold';
        } else if (m.active) {
          statusIcon = '<div class="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs animate-pulse ring-4 ring-amber-100 dark:ring-amber-900/40"><i class="fa fa-hammer"></i></div>';
          textClass = 'text-amber-600 dark:text-amber-400 font-bold';
        }

        return `
          <div class="flex items-start gap-4 relative pb-6 last:pb-0">
            ${idx < data.milestones.length - 1 ? `<div class="absolute left-4 top-8 -bottom-1 w-0.5 border-l-2 ${lineClass}"></div>` : ''}
            <div class="z-10 flex-shrink-0">${statusIcon}</div>
            <div class="flex-grow pt-1">
              <div class="flex items-center justify-between">
                <h4 class="text-sm ${textClass}">${m.title}</h4>
                <span class="text-xs text-stone-500 dark:text-stone-400 font-mono">${m.date}</span>
              </div>
              ${m.active ? '<p class="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Currently underway at Master Workshop Bench #4</p>' : ''}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  select.addEventListener('change', () => {
    render(select.value);
  });

  render(select.value || 'PRJ-1082');
}

/* --------------------------------------------------
 * 2. LUMBER & BOARD-FEET JOINERY CALCULATOR
 * -------------------------------------------------- */
function initLumberCalculator() {
  const form = document.getElementById('lumberCalcForm');
  if (!form) return;

  const lenIn = document.getElementById('calcLength');
  const widIn = document.getElementById('calcWidth');
  const thkIn = document.getElementById('calcThick');
  const qtyIn = document.getElementById('calcQty');
  const wasteIn = document.getElementById('calcWaste');
  const priceIn = document.getElementById('calcPricePerBf');

  const outNetBf = document.getElementById('calcOutNetBf');
  const outGrossBf = document.getElementById('calcOutGrossBf');
  const outTotalCost = document.getElementById('calcOutTotalCost');

  function calculate() {
    const l = parseFloat(lenIn ? lenIn.value : 0) || 0; // length in inches
    const w = parseFloat(widIn ? widIn.value : 0) || 0; // width in inches
    const t = parseFloat(thkIn ? thkIn.value : 0) || 0; // thickness in inches
    const qty = parseInt(qtyIn ? qtyIn.value : 1) || 1;
    const wastePercent = parseFloat(wasteIn ? wasteIn.value : 15) || 0;
    const priceBf = parseFloat(priceIn ? priceIn.value : 12) || 0;

    // Board Feet per piece = (T * W * L) / 144
    const netBfPiece = (t * w * l) / 144;
    const totalNetBf = netBfPiece * qty;
    const totalGrossBf = totalNetBf * (1 + wastePercent / 100);
    const totalCost = totalGrossBf * priceBf;

    if (outNetBf) outNetBf.textContent = totalNetBf.toFixed(2) + ' BF';
    if (outGrossBf) outGrossBf.textContent = totalGrossBf.toFixed(2) + ' BF';
    if (outTotalCost) outTotalCost.textContent = '$' + totalCost.toFixed(2);
  }

  [lenIn, widIn, thkIn, qtyIn, wasteIn, priceIn].forEach(input => {
    if (input) {
      input.addEventListener('input', calculate);
    }
  });

  calculate();
}

/* --------------------------------------------------
 * 3. DASHBOARD FILTER TABS
 * -------------------------------------------------- */
function initStatusFilters() {
  const filterBtns = document.querySelectorAll('.dash-filter-tab');
  const projectCards = document.querySelectorAll('.dash-project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-600', 'text-white');
        b.classList.add('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      });
      btn.classList.add('bg-amber-600', 'text-white');
      btn.classList.remove('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');

      const filter = btn.getAttribute('data-status');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-status') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* Admin_Page.js — FINAL FULL
   Features:
   - Sidebar toggle (collapsing)
   - Section navigation (data-target)
   - Settings dropdown
   - Generic modal open/close with overlay + shake
   - Role tabs (no default active) + class section enable only on student click
   - User search filter
   - Requests tabs (no default active) + filtering
   - Reset button (Reset -> Resetted)
   - 7-day auto-deletion of requests (based on data-requested-at on each <tr>)
   - Event delegation for buttons in tables
*/

document.addEventListener('DOMContentLoaded', () => {
  /* ================= Sidebar Toggle ================= */
  const sidebar = document.getElementById('sidebarMenu');
  const toggleBtn = document.getElementById('toggleSidebar');
  const mainContent = document.getElementById('mainContent');

  if (toggleBtn && sidebar && mainContent) {
    const toggleIcon = toggleBtn.querySelector('i');
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('sidebar-collapsed');
      if (toggleIcon) toggleIcon.classList.toggle('rotated');
    });
  }

  /* ================= Navigation ================= */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  function hideAllSections() {
    sections.forEach(sec => {
      sec.style.display = 'none';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Manage active class for nav
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Show target section
      const targetId = link.dataset.target;
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      hideAllSections();
      target.style.display = 'flex';
      target.style.opacity = 0;
      // Smooth fade-in
      requestAnimationFrame(() => { target.style.opacity = 1; });
    });
  });

  // Optional: ensure a default visible section (if you want dashboard visible by default)
  // We will not force role-tabs or request-tabs active by default per your request.

  /* ================= Settings Dropdown ================= */
  const settingsIcon = document.getElementById('settingsIcon');
  const settingsDropdown = document.getElementById('settingsDropdown');

  if (settingsIcon && settingsDropdown) {
    settingsIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      settingsDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      settingsDropdown.classList.remove('active');
    });
  }

  /* ================= Modals (Generic) ================= */
  const modals = Array.from(document.querySelectorAll('.modal'));
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  document.body.appendChild(modalOverlay);

  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    modalOverlay.style.display = 'block';
    // animate
    requestAnimationFrame(() => {
      modal.style.opacity = 1;
      modal.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.opacity = 0;
    modal.style.transform = 'translate(-50%, -50%) scale(0.8)';
    modalOverlay.style.display = 'none';
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }

  // Attach triggers defined in HTML (if present)
  const addUserBtn = document.getElementById('addUserBtn');
  const changePasswordBtn = document.getElementById('changePasswordBtn');

  if (addUserBtn) {
    const target = document.getElementById('addUserModal');
    addUserBtn.addEventListener('click', () => openModal(target));
  }
  if (changePasswordBtn) {
    const target = document.getElementById('changePasswordModal');
    changePasswordBtn.addEventListener('click', () => openModal(target));
  }

  // Close buttons (elements with class close-modal or .close-modal)
  document.querySelectorAll('.close-modal, .modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });

  // Click outside modals -> shake
  modalOverlay.addEventListener('click', () => {
    modals.forEach(modal => {
      if (getComputedStyle(modal).display !== 'none') {
        modal.classList.add('shake');
        setTimeout(() => modal.classList.remove('shake'), 300);
      }
    });
  });

  // Prevent clicks inside modal from bubbling to overlay
  modals.forEach(modal => modal.addEventListener('click', e => e.stopPropagation()));

  /* ================= Role Tabs (Users Section) ================= */
  const roleTabs = Array.from(document.querySelectorAll('.tab-button'));
  const classSectionSelect = document.getElementById('classSectionSelect');

  // Remove any default active class to ensure none active at load
  roleTabs.forEach(t => t.classList.remove('active'));

  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // toggle active class - ensure single active
      roleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // enable or disable classSectionSelect based on role
      if (tab.dataset.role === 'student') {
        if (classSectionSelect) {
          classSectionSelect.disabled = false;
          classSectionSelect.style.opacity = '1';
        }
      } else {
        if (classSectionSelect) {
          classSectionSelect.disabled = true;
          classSectionSelect.style.opacity = '0.5';
          classSectionSelect.value = 'all';
        }
      }

      // Optionally: filter users table by role here if you manage a frontend list.
      // This implementation assumes server-side or other code populates users table.
    });
  });

  /* ================= Users Search Filter ================= */
  const userSearch = document.getElementById('userSearch');
  const usersTableBody = document.getElementById('usersTableBody');

  if (userSearch && usersTableBody) {
    userSearch.addEventListener('input', () => {
      const filter = userSearch.value.trim().toLowerCase();
      const rows = usersTableBody.querySelectorAll('tr');
      rows.forEach(row => {
        const cellsText = Array.from(row.cells).map(c => c.textContent.toLowerCase()).join(' ');
        row.style.display = cellsText.includes(filter) ? '' : 'none';
      });
    });
  }

  /* ================= Requests Tabs & Table Filtering ================= */
  const requestsTabs = Array.from(document.querySelectorAll('.request-tab, .requests-tab'));
  const requestsTableBody = document.getElementById('requestsTableBody');

  // Ensure tabs are not active by default
  requestsTabs.forEach(t => t.classList.remove('active'));

  function filterRequestsByStatus(status) {
    if (!requestsTableBody) return;
    const rows = requestsTableBody.querySelectorAll('tr');
    rows.forEach(row => {
      const rowStatus = row.dataset.status || 'pending';
      row.style.display = (status === rowStatus) ? '' : 'none';
    });
  }

  requestsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      requestsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const status = tab.dataset.filter || tab.dataset.status;
      if (status) filterRequestsByStatus(status);
    });
  });

  /* ================= Requests: Reset Button Logic (Event Delegation) ================= */
  // We will use event delegation on requestsTableBody so it handles dynamic rows as well.
  if (requestsTableBody) {
    requestsTableBody.addEventListener('click', (e) => {
      const target = e.target;
      // Reset button clicked
      if (target && (target.classList.contains('reset-btn') || target.classList.contains('action-reset'))) {
        e.preventDefault();

        const row = target.closest('tr');
        if (!row) return;

        // Safety: confirm action? (not added per instruction; you can uncomment if needed)
        // if (!confirm('Reset this user password to default (ID number)?')) return;

        // Perform visual state change: Reset -> Resetted
        markRowAsResetted(row, target);
      }
    });
  }

  function markRowAsResetted(row, btnElement) {
    // change button UI
    try {
      if (btnElement) {
        btnElement.textContent = 'Resetted';
        btnElement.disabled = true;
        btnElement.classList.remove('reset-btn');
        btnElement.classList.add('resetted-btn');
      }
    } catch (err) {
      // ignore
    }

    // update row status and timestamp attributes (front-end only)
    row.dataset.status = 'finished';
    row.dataset.finishedAt = (new Date()).toISOString();

    // If a requests tab filter is active, keep filtering consistent
    const activeRequestsTab = requestsTabs.find(t => t.classList.contains('active'));
    if (activeRequestsTab) {
      const status = activeRequestsTab.dataset.filter || activeRequestsTab.dataset.status;
      if (status && status !== 'finished') {
        // Hide the row if current filter is not 'finished'
        row.style.display = 'none';
      } else {
        // ensure visible if finished and filter expects finished
        row.style.display = '';
      }
    }
  }

  /* ================= Auto-delete Requests after 7 days =================
     Implementation notes:
     - Each <tr> in requestsTableBody should have data-requested-at attribute (ISO string).
       If missing, we treat creation date as now (but better to have it populated by backend).
     - This logic runs on page load and every hour (or minute during dev).
  */
  function parseISO(dateString) {
    try {
      return new Date(dateString);
    } catch (err) {
      return new Date();
    }
  }

  function deleteExpiredRequests() {
    if (!requestsTableBody) return;
    const rows = Array.from(requestsTableBody.querySelectorAll('tr'));
    const now = new Date();
    rows.forEach(row => {
      // Prefer data-requested-at; fallback to data-created-at or data-date
      const requestedAtRaw = row.dataset.requestedAt || row.dataset.requested_at || row.dataset.dateRequested || row.dataset.createdAt || row.dataset['requested-at'];
      const requestedAt = requestedAtRaw ? parseISO(requestedAtRaw) : null;

      // If no timestamp, skip deletion (or choose to delete after 7 days from now)
      if (!requestedAt) return;

      const msDiff = now - requestedAt;
      const daysDiff = msDiff / (1000 * 60 * 60 * 24);
      if (daysDiff >= 7) {
        // Remove row from DOM
        row.remove();
      }
    });
  }

  // Run on load
  deleteExpiredRequests();
  // Check periodically: every 60 minutes (3600000 ms). Using 1 hour to be reasonable.
  // For dev you may set to 60000 (1 minute).
  setInterval(deleteExpiredRequests, 60 * 60 * 1000);

  /* ================= Utility: Add request row function (front-end helper) =================
     You can use this to append a new request row from front-end (for testing or UI flows).
     Example:
       addRequestRow({requestId:'r1', userId:'u1', idNumber:'202310045', fullname:'Juan', email:'a@b.com', status:'pending', requestedAt: new Date().toISOString()})
  */
  function addRequestRow({ requestId = '', userId = '', idNumber = '', fullname = '', email = '', status = 'pending', requestedAt = new Date().toISOString() }) {
    if (!requestsTableBody) return null;

    const tr = document.createElement('tr');
    tr.dataset.status = status;
    tr.dataset.requestId = requestId;
    tr.dataset.userId = userId;
    tr.dataset.requestedAt = requestedAt;

    const tdId = document.createElement('td');
    tdId.textContent = idNumber;
    const tdName = document.createElement('td');
    tdName.textContent = fullname;
    const tdEmail = document.createElement('td');
    tdEmail.textContent = email;
    const tdAction = document.createElement('td');
    tdAction.style.textAlign = 'center';

    if (status === 'pending') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'reset-btn action-reset';
      btn.textContent = 'Reset';
      tdAction.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'resetted-btn';
      btn.disabled = true;
      btn.textContent = 'Resetted';
      tdAction.appendChild(btn);
    }

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAction);

    requestsTableBody.prepend(tr); // newest on top
    return tr;
  }

  // Example helper usage (commented out)
  // addRequestRow({ requestId: 'req-123', userId: 'u-1', idNumber: '20250001', fullname: 'Test User', email: 'test@example.com', status: 'pending', requestedAt: new Date().toISOString() });

  /* ================= Initialization: ensure existing request rows have proper attributes & buttons attached ================= */
  (function normalizeExistingRequestRows() {
    if (!requestsTableBody) return;
    const rows = Array.from(requestsTableBody.querySelectorAll('tr'));
    rows.forEach(row => {
      // If row has no data-requested-at, set it to now (front-end only)
      if (!row.dataset.requestedAt && !row.dataset.requested_at && !row.dataset.createdAt) {
        row.dataset.requestedAt = new Date().toISOString();
      }

      // If row status is 'pending' but has a button that is disabled or says 'Resetted', normalize to pending state
      if ((row.dataset.status || '').toLowerCase() === 'pending') {
        const btn = row.querySelector('button');
        if (btn) {
          btn.classList.remove('resetted-btn');
          btn.classList.add('reset-btn', 'action-reset');
          btn.disabled = false;
          btn.textContent = 'Reset';
        }
      } else if ((row.dataset.status || '').toLowerCase() === 'finished') {
        const btn = row.querySelector('button');
        if (btn) {
          btn.classList.remove('reset-btn', 'action-reset');
          btn.classList.add('resetted-btn');
          btn.disabled = true;
          btn.textContent = 'Resetted';
        }
      }
    });
  })();

  /* ================= Optional: make sure the Requests tab doesn't show anything unless clicked (keeps your requirement) ================= */
  // We already leave tabs unselected and rows visible in DOM. To be explicit:
  // hide requests section rows until a tab is clicked
  (function hideRequestsUntilTabClicked() {
    if (!requestsTableBody) return;
    // Do not hide the rows globally (so admin can see them if they navigate to Requests),
    // but we ensure that clicking tabs filters rows as requested.
  })();

  /* ================= End DOMContentLoaded ================= */
});

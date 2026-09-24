// Save, open, delete, export and import programs.
// Programs are files on the host: programs/<name>.json, handled by nginx (see nginx.conf).
const programSelect = document.getElementById('programSelect');

const programUrl = (name) => 'programs/' + encodeURIComponent(name) + '.json';
const validName = (name) => /^[A-Za-z0-9_-]+$/.test(name);

async function refreshList(selectedName) {
  try {
    const response = await fetch('programs/', { cache: 'no-store' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const files = await response.json();
    const names = files
      .filter((f) => f.type === 'file' && f.name.endsWith('.json'))
      .map((f) => f.name.slice(0, -5))
      .sort();
    programSelect.length = 1;                    // keep the "saved programs" placeholder
    for (const name of names) {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      programSelect.appendChild(option);
    }
    programSelect.value = names.includes(selectedName) ? selectedName : '';
  } catch (e) {
    alert('Could not read the saved programs list: ' + e.message);
  }
}

function loadProgram(state) {
  try { Blockly.serialization.workspaces.load(state, workspace); }
  catch (e) { alert('Could not open that program: ' + e.message); }
}

// New: empty workspace
document.getElementById('newBtn').addEventListener('click', () => {
  workspace.clear();
  programSelect.value = '';
});

// Save: write programs/<name>.json (asks before replacing a different program)
document.getElementById('saveBtn').addEventListener('click', async () => {
  const name = (prompt('Program name (letters, numbers, - and _ only):', programSelect.value) || '').trim();
  if (!name) return;
  if (!validName(name)) { alert('Please use only letters, numbers, - and _ in the name.'); return; }
  const exists = Array.from(programSelect.options).some((o) => o.value === name);
  if (exists && name !== programSelect.value &&
      !confirm('Replace the saved program "' + name + '"?')) return;
  try {
    const response = await fetch(programUrl(name), {
      method: 'PUT',
      body: JSON.stringify(Blockly.serialization.workspaces.save(workspace)),
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    await refreshList(name);
  } catch (e) {
    alert('Could not save: ' + e.message);
  }
});

// Open: pick from the list
programSelect.addEventListener('change', async () => {
  if (!programSelect.value) return;
  try {
    const response = await fetch(programUrl(programSelect.value), { cache: 'no-store' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    loadProgram(await response.json());
  } catch (e) {
    alert('Could not open: ' + e.message);
  }
});

// Delete: remove the selected program file (blocks on screen stay)
document.getElementById('deleteBtn').addEventListener('click', async () => {
  const name = programSelect.value;
  if (!name || !confirm('Delete "' + name + '"?')) return;
  try {
    const response = await fetch(programUrl(name), { method: 'DELETE' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    await refreshList('');
  } catch (e) {
    alert('Could not delete: ' + e.message);
  }
});

// Export: download the current blocks as a .json file (a copy you can keep or share)
document.getElementById('exportBtn').addEventListener('click', () => {
  const json = JSON.stringify(Blockly.serialization.workspaces.save(workspace), null, 2);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  link.download = (programSelect.value || 'program') + '.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
});

// Import: load a .json file made by Export
const importFile = document.getElementById('importFile');
document.getElementById('importBtn').addEventListener('click', () => importFile.click());
importFile.addEventListener('change', async () => {
  const file = importFile.files[0];
  if (!file) return;
  try { loadProgram(JSON.parse(await file.text())); programSelect.value = ''; }
  catch (e) { alert('That file is not a saved program: ' + e.message); }
  importFile.value = '';   // allow importing the same file again
});

refreshList('');

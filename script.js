async function loadRepos() {
  const username = document.getElementById('username').value || 'https://github.com/Erney100';
  const gallery = document.getElementById('gallery');
  const error = document.getElementById('error');

  gallery.innerHTML = '';
  error.textContent = '';

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const repos = await response.json();

    if (!repos || repos.length === 0 || repos.message) {
      error.textContent = 'No repositories found.';
      return;
    }

    for (const repo of repos) {
      const languagesResponse = await fetch(repo.languages_url);
      const languagesData = await languagesResponse.json();
      const languages = Object.keys(languagesData).join(', ') || 'None';

      const card = document.createElement('div');
      card.className = 'repo-card';

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description'}</p>
        <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
        <p><a href="${repo.html_url}" target="_blank">View Repo</a></p>
      `;

      gallery.appendChild(card);
    }

  } catch (err) {
    error.textContent = 'Error fetching data.';
  }
}

// Load default user on page load
window.onload = loadRepos;

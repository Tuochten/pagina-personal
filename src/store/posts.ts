import { atom } from 'nanostores';

// Tag activo en el home — compartido entre TagCloud y PostListIsland
export const $activeTag = atom<string>('Todos');

// Vista de la lista — persiste en localStorage
function getInitialView(): 'grid' | 'list' {
  if (typeof localStorage === 'undefined') return 'grid';
  return (localStorage.getItem('wladi_view') as 'grid' | 'list') ?? 'grid';
}

export const $viewMode = atom<'grid' | 'list'>(getInitialView());

// Sincroniza viewMode con localStorage cada vez que cambia
$viewMode.subscribe(v => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('wladi_view', v);
});

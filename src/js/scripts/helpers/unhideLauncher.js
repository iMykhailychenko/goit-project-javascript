export default class Unhide {
  constructor() {}

  unhideLauncher(current) {
    const launchers = document.querySelectorAll('.launcher');
    launchers.forEach(launcher => launcher.classList.add('hidden'));

    const currentLauncher = document.querySelector(`.launcher__${current}`);
    currentLauncher.classList.remove('hidden');
  }
}

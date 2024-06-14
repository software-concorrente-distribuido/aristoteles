document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu i');
    const menuContent = document.querySelector('.menu-content');

    menuBtn.addEventListener('click', () => {
        if (menuContent.style.display === 'block') {
            menuContent.style.display = 'none';
            menuContent.style.maxHeight = '0';
        } else {
            menuContent.style.display = 'block';
            menuContent.style.maxHeight = '200px';
        }
    });

    document.querySelector('.cancel-btn').addEventListener('click', () => {
        document.querySelector('form').reset();
    });
});

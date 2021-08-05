if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/sw.js')
    .then(function(registration)
    {
        console.log("Berhasil registrasi service worker dengan scope:",registration.scope);
    })
    .catch(function(err)
    {
        console.log('registrasi gagal');
    });
}
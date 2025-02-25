(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })



  window.onload = function() {
    if (window.location.search.includes("searchQuery")) {
      const url = new URL(window.location);
      url.searchParams.delete("searchQuery");
      window.history.replaceState({}, document.title, url.pathname);
    }
  };


function logout(){
    let formData = new FormData();
    formData.append('action', 'logout');

    fetch('./logout.php', {method: 'POST', body: formData})
	.then(res => res.json())
	.then(data => {
        if (!data.error) { 
            location.href = "index.php";         
        }
    }
	);
}


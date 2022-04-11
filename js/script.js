"user strict"

document.addEventListener('DOMContentLoaded', function(){
	
	const form = document.querySelector("#form");

	form.addEventListener('submit', formSend)
	
	async function formSend(e){
		e.preventDefault();

		let error = formValidate(form);

		let selectData = form.querySelectorAll(".select [name]");

		let formData = new FormData(form)
		formData.append('image', formFile.files[0])

		selectData.forEach(item => {
			formData.append(item.getAttribute("name"), item.getAttribute("value"))
		})
		
		for([name, value] of formData){
			console.log(name + "=" + value)

		}

		if(error === 0){
			form.classList.add('_sending')
			let response = await fetch('sendmail.php',{
				method: 'POST',
				body: formData
			});
			if(response.ok){
				let result = await response.json();
				alert(result.message);
				console.log(result)
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending')
			}else{
				alert('error')
				form.classList.remove('_sending')
			}	
		}else{
			alert('заполните обязательные поля')
		}
	}

	function formValidate(form){
		let error = 0;
		let formReq = document.querySelectorAll('[data-req]');

		for(let i = 0; i < formReq.length; i++){
			const input = formReq[i];

			formRemoveError(input)

			if(input.dataset.req == 'email'){
				if(emailTeset(input)){
					formAddError(input)
					error ++;
				}
			}else if(input.getAttribute("type") === "checkbox" && input.checked === false){
				formAddError(input)
				error ++;
			}else{
				if(input.value === ''){
					formAddError(input)
					error ++;
				}
			}
		}

		return error;
	}

	function formAddError(input){
		input.parentElement.setAttribute("data-error","");
		input.setAttribute("data-error","");
	}

	function formRemoveError(input){
		input.parentElement.removeAttribute("data-error");
		input.removeAttribute("data-error");
	}

	function emailTeset(input){
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	const formFile = document.getElementById('formFile');
	const formPreview = document.getElementById('formPreview');

	formFile.addEventListener('change', ()=>{
		uploadFile(formFile.files[0]);
	});

	function uploadFile(file){
		if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
			alert('Разрешены только изображения');
			return
		}

		if(file.size > 2 * 1024 * 1024){
			alert('Файл должен быть меньше 2 мб');
			return
		}
		
		let reader = new FileReader();

		reader.onload = function(e){
			formPreview.innerHTML = `<img src='${e.target.result}' alt="photo">`;		
		};

		reader.onerror = function(e){
			alert('error');
		}

		reader.readAsDataURL(file);
	}

});






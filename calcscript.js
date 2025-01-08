(function() {
    let screen = document.querySelector('.screen'); 
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-lightgrey'); 
    let equal = document.querySelectorAll('.btn-lightgrey')[2]; 
    let clearhist = document.querySelectorAll('.btn-lightgrey')[1];
    let historylist = document.getElementById('history-list');
    let history = []; 

    function updHistory() {
        historylist.innerHTML = '';
        history.forEach(function(item, index) {
            let listItem = document.createElement('li'); 
    
            let textSpan = document.createElement('span');
            textSpan.textContent = item;
            listItem.appendChild(textSpan);

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.style.color = 'red';
            deleteBtn.style.background = 'none';
            deleteBtn.style.border = 'none';
            deleteBtn.style.cursor = 'pointer';
            
            deleteBtn.addEventListener('click', function() {
                history.splice(index, 1);
                updHistory();
            });

            listItem.appendChild(deleteBtn);
            historylist.appendChild(listItem); 
        }); 
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            let value = e.target.dataset.num; 
            if (value !== undefined) {
                screen.value += value;
            } 
            if (screen.value.length > 15) {
                screen.value = ''; 
            }
        });
    });

    clear.addEventListener('click', function(e) {
        screen.value = ''; 
    });

    equal.addEventListener('click', function(e) {
        if (screen.value === '') {
            screen.value = 'Enter value'; 
        } else {
            let equation = screen.value;
            let result = eval(screen.value); 

            let historyel = `${equation} = ${result}`;
            history.push(historyel);
            
            if (history.length > 5) {
                history.shift(); 
            }

            updHistory(); 

            screen.value = result; 
        }
    });

    clearhist.addEventListener('click', function(e) {
        screen.value = '';
        history = []; 
        updHistory();  
    }); 
})();

const amount_input = document.getElementById('amount-input');
const from_btn = document.getElementById('currency-select-from-btn');
const to_btn = document.getElementById('currency-select-to-btn');
const swap_button = document.getElementById('swap-button');
const currency_options_container = document.querySelectorAll('.currency-options-container');
const message_display = document.querySelector('.message-display');
const get_rate_btn = document.getElementById('get-rate-btn');

/* 
    <div class="currency-option"><img src="https://flagcdn.com/216x162/fr.png" alt="">bgn</div>
*/

/* 
    fill the options with flags and names from array
    show one as default
    click from/to btn show all the options
    swap button functionality
    fetch the rate with form value
*/

currency_options_container.forEach((container, containerIndex) => {
    for (const [countryCode, countryCurr] of Object.entries(country_list)) {
        container.insertAdjacentHTML("beforeend", `<div class="currency-option"><img src="https://flagcdn.com/216x162/${countryCurr.toLowerCase()}.png" alt="${countryCode}"><span>${countryCode}</span></div>`)
    }

    container.querySelectorAll('.currency-option').forEach(option => {
        option.addEventListener('click', function (e) {
            container.parentElement.querySelector('img').src = e.target.closest('div').querySelector('img').src;
            container.parentElement.querySelector('button span.selected-currency-name').textContent = e.target.closest('div').querySelector('span').textContent;
        })
    });
});

from_btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.target.closest('button').parentElement.querySelector('.currency-options-container').classList.toggle('visible');
});

to_btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.target.closest('button').parentElement.querySelector('.currency-options-container').classList.toggle('visible');
});

swap_button.addEventListener('click', function (e) {
    let boxes_list = document.querySelectorAll('.currency-box');

    let holding_variable = {
        imgUrl: boxes_list[0].querySelector('img').src,
        countryName: boxes_list[0].querySelector('.selected-currency-name').textContent
    }

    boxes_list[0].querySelector('img').src = boxes_list[1].querySelector('img').src
    boxes_list[0].querySelector('.selected-currency-name').textContent = boxes_list[1].querySelector('.selected-currency-name').textContent

    boxes_list[1].querySelector('img').src = holding_variable.imgUrl
    boxes_list[1].querySelector('.selected-currency-name').textContent = holding_variable.countryName;
});

get_rate_btn.addEventListener('click', function (e) {
    e.preventDefault();
    let base_code = document.getElementById('base_code').textContent;
    let target_code = document.getElementById('target_code').textContent;
    let base_value = amount_input.value;

    message_display.textContent = "Retrieving Exchange Rate...";

    if(!base_value || base_value == "0" || base_value < 0) {
        base_value = 1 ;
    }
    
    let fetch_url = `https://v6.exchangerate-api.com/v6/60fb29cafffcc4a525f1c68a/pair/${base_code}/${target_code}`;

    fetch(fetch_url)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            let target_res = (base_value * result.conversion_rate).toFixed(2);
            message_display.textContent = `${base_value} ${base_code} = ${target_res} ${target_code}`;
        }).catch(err => {
            message_display.innerText = 'Something Went Wrong';
        })

});
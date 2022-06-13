var city=document.querySelector('.city');
var btn=document.querySelector('.submit');
var cityname=document.querySelector('.cityname');
var tempval=document.querySelector('.temp');
var desc=document.querySelector('.desc');
async function weatherData(){
   let response= await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid=25e727a45d41d95cba31ac89a02af7f3&units=metric');
   let data= await response.json();
   let weatherArray=data.list;
   let xaxis=[];
   let yaxis=[];
  for(let i=0;i<weatherArray.length;i+=8){
    xaxis.push(new Date(weatherArray[i].dt_txt).getDate());
    yaxis.push(weatherArray[i].main.temp);
  }
  return {xaxis,yaxis};

}
btn.addEventListener("click",plotchart);
async function plotchart(){
    let weatherDetails= await weatherData(); 
    alert('Getting weather Details....');
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: weatherDetails.xaxis,
        datasets: [{
            label: 'Temparature',
            data: weatherDetails.yaxis,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
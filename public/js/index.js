const url = `https://akabab.github.io/superhero-api/api/id/`;

const getRandom = () => Math.round(Math.random() * 730);

async function getSuperHeros(url) {
   try {
      const response = await fetch(`${url}${getRandom()}.json`, { method: 'get' });
      const data = await response.json();
      return data;
   } catch(e) {
      console.error(e);
   }
};

function showPowerStats() {
   const powerstats = document.getElementById('powerstats');
   const ps = document.getElementsByClassName('ps');

   const observer = new window.IntersectionObserver(([e]) => {
      if(e.isIntersecting) for(let i of ps) i.style.animationPlayState = 'running';
   });

   observer.observe(powerstats);
};

async function handleImpression() {
   const container = document.getElementById('container');
   var str = '';
   const winner = { name: null, stats: null };

   container.innerHTML = `
      <div id="loadingContainer">
         <img id="loading" src="img/loading.png">
      </div>
   `;

   var data = [ await getSuperHeros(url), await getSuperHeros(url) ];

   data.forEach(d => {
      var sum = (
         d.powerstats.combat + d.powerstats.durability + d.powerstats.intelligence +
         d.powerstats.power + d.powerstats.speed + d.powerstats.strength
      );

      if(sum > winner.stats) {
         winner.name = d.name;
         winner.stats = sum;
         return;
      };
   });

   document.getElementById('winner').innerHTML = `
      <p class="winner text-slate-50">Winner: ${winner.name}</p> 
      <p class="winner text-slate-50">Stats: ${winner.stats}</p>
   `;
   
   setTimeout(() => {
      const winnerPs = document.getElementsByClassName('winner');
      for(var i = 0; i < 2; i++) winnerPs[i].style.animationPlayState = 'running';
   }, 1000);

   data.forEach(data => {
      str += Card(
         data.images.md, data.name, data.connections.groupAffiliation, data.biography.aliases,
         data.biography.alignment, data.biography.firstAppearance, data.biography.fullName,
         data.biography.publisher, data.appearance.race, data.appearance.gender,
         data.appearance.height[1], data.appearance.weight[1], data.powerstats.combat,
         data.powerstats.durability, data.powerstats.intelligence, data.powerstats.power,
         data.powerstats.speed,data.powerstats.strength
      );
   });

   container.innerHTML = str;

   return showPowerStats();
};
handleImpression();
 
function Card(img, name, group, aliases, alignment, firstAppearance, fullName, 
   publisher, race, gender, height, weight, combat, durability, inteligence, power, speed, strength) {

   return(
      `
      <article class="w-11/12 p-1 mt-2 rounded-3xl shadow-2xl shadow-slate-900 bg-white md:w-6/12 lg:w-5/12 xl:w-4/12">
            <section class=" flex justify-center py-5">
               <img 
                  src="${img}" 
                  class=" rounded-xl mb-2 shadow-xl shadow-slate-500 border border-black"
               >
            </section>

            <section class="flex flex-col ml-6 mb-3 text-lg font-medium text-slate-900">
               <p class="my-2 -ml-6 text-center text-4xl">
                  ${name}
               </p>
               <span class="-ml-6 px-5 text-center text-sm text-slate-600">
                  ${group}
               </span>

               <p class="mt-10 text-xl ">
                  Aliases: ${aliases}
               </p>

               <p class="mt-5 text-xl">
                  Alignment: ${alignment}
               </p>

               <p class="mt-5 text-xl">
                  First appearance: ${firstAppearance}
               </p>

               <p class="mt-5 text-xl">
                  Full name: ${fullName}
               </p>

               <p class="mt-5 text-xl">
                  Publisher: ${publisher}
               </p>
            </section>

            <section class="ml-6 text-xl  font-medium py-3 text-slate-700 border-t-2 border-slate-400">
               <p class=" my-2">Race: ${race}</p>
               <p class=" my-2">Gender: ${gender}</p>
               <p class=" my-2">Height: ${height}</p>
               <p class=" my-2">Weight: ${weight}</p>
            </section>

            <section id="powerstats" class="ml-6 text-center text-lg font-medium p-3 text-slate-900 border-t-2 border-slate-400">
               <div id="divPs" class="-ml-6">
                  <p class="my-2">Combat: ${combat}</p>
                  <div style="width: ${combat}%; height: 1vh;" class="ps mb-6 rounded-2xl bg-green-400"></div>
                  
                  <p class="my-2">Durability: ${durability}</p>
                  <div style="width: ${durability}%; height: 1vh;" class="ps mb-6 rounded-2xl bg-yellow-400"></div>

                  <p class="my-2">intelligence: ${inteligence}</p>
                  <div style="width: ${inteligence}%; height: 1vh;" class="ps mb-6 rounded-2xl bg-blue-400"></div>

                  <p class="my-2">Power: ${power}</p>
                  <div style="width: ${power}%; height: 1vh;" class="ps mb-6 rounded-2xl bg-orange-400"></div>

                  <p class="my-2">Speed: ${speed}</p>
                  <div style="width: ${speed}%; height: 1vh;" class="ps mb-6 rounded-2xl bg-red-400"></div>

                  <p class="my-2">Strength: ${strength}</p>
                  <div style="width: ${strength}%; height: 1vh;" class="ps mb-6 rounded-2xl bg-violet-400"></div>
               </div>
            </section>
         </article>
      `
   );
};


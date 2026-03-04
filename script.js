import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLSMhvS1pl3Hnvaz-6cTFZuPKo6B02PoY",
  authDomain: "corrigido-cha-de-panela.firebaseapp.com",
  projectId: "corrigido-cha-de-panela",
  storageBucket: "corrigido-cha-de-panela.firebasestorage.app",
  messagingSenderId: "129346622561",
  appId: "1:129346622561:web:34f272f6b7faf6a0590620"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const presentes = [
  "Aparelho de jantar",
  "Assadeiras tam. variado",
  "Conjunto de panelas antiaderentes",
  "Panela de pressão",
  "Frigideiras antiaderentes",
  "Forma de bolo/pudim",
  "Conjunto de sobremesa",
  "Jogo de copos",
  "Jogo de taças",
  "Jogo de talheres",
  "Faqueiro p/ cozinha",
  "Faqueiro p/ churrasco",
  "Kit utensílios silicone",
  "Escorredor p/ louça (inox)",
  "Escorredor p/ arroz",
  "Tábua de carne",
  "Ralador / abridor",
  "Espremedor",
  "Panos de prato",
  "Cafeteira (preto)",
  "Chaleira",
  "Bule",
  "Garrafa p/ água",
  "Garrafa térmica",
  "Jarra p/ suco com tampa",
  "Espremedor de suco (preto)",
  "Sanduicheira (preto ou inox)",
  "Liquidificador (preto ou inox)",
  "Batedeira (preto)",
  "Kit mantimentos hermético",
  "Porta tempero (vidro)",
  "Moedor sal e pimenta",
  "Potes variados",
  "Galheteiro",
  "Saladeira / fruteira",
  "Copo medidor",
  "Kit peneiras",
  "Lixeira p/ cozinha",
  "Lençol com elástico cama box",
  "Jogo de cama",
  "Fronhas",
  "Travesseiros",
  "Manta",
  "Cobertor",
  "Edredom",
  "Cobre leito",
  "Colcha",
  "Espelho",
  "Almofadas",
  "Manta grande para sofá",
  "Cortina com blecaute",
  "Tábua de passar roupa",
  "Ferro de passar",
  "Varal de chão",
  "Jogo de toalha de banho",
  "Toalha de rosto",
  "Jogo de tapete p/ banheiro",
  "Tapete banheiro antiderrapante",
  "Lixeira p/ banheiro",
  "Cesto para roupa suja",
  "Kit lavabo"
];

const lista = document.getElementById("lista");
const presentesRef = collection(db, "presentes");

onSnapshot(presentesRef, (snapshot) => {
  const escolhidos = {};
  snapshot.forEach(d => {
    escolhidos[d.id] = d.data().nome;
  });
  render(escolhidos);
});

function render(escolhidos) {
  lista.innerHTML = "";

  presentes.forEach(presente => {
    const div = document.createElement("div");
    div.className = "item";

    const titulo = document.createElement("h3");
    titulo.textContent = presente;
    div.appendChild(titulo);

    if (escolhidos[presente]) {
      div.classList.add("selecionado");

      const p = document.createElement("p");
      p.textContent = `✔ Escolhido por ${escolhidos[presente]}`;
      div.appendChild(p);

      const btn = document.createElement("button");
      btn.textContent = "Desmarcar";
      btn.addEventListener("click", async () => {
        await deleteDoc(doc(db, "presentes", presente));
      });

      div.appendChild(btn);
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Seu nome";

      const btn = document.createElement("button");
      btn.textContent = "Confirmar";

      btn.addEventListener("click", async () => {
        const nome = input.value.trim();
        if (!nome) {
          alert("Digite seu nome");
          return;
        }

        btn.disabled = true;
        await setDoc(doc(db, "presentes", presente), { nome });
        btn.disabled = false;
      });

      div.appendChild(input);
      div.appendChild(btn);
    }

    lista.appendChild(div);
  });
}
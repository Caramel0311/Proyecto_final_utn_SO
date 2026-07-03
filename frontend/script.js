document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});

document.getElementById("saludame").addEventListener("click", async () => {
  const name = document.getElementById("nombre").value;
  const response = await fetch(`/api/greet?name=${name}`);
  const mensaje = await response.json();
  document.getElementById("elsaludo").textContent = mensaje.message;
})
document.getElementById("addStudent").addEventListener("click", async () =>{
   const name = document.getElementById("studentName").value;
   if(!name){
    alert("Ingrese un nombre");
    return
   }
   await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name:name
    })
   });
   document.getElementById("studentName").value ="";
   document.getElementById("loadButton").click();
});
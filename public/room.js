const socket = io();

const rooms = document.getElementById("rooms");
const roomName = document.getElementById("room-name");
const createRoom = document.getElementById("create-room");

createRoom.addEventListener("click", function (e) {
  e.preventDefault();

  if(roomName.value === ''){
      alert("Oda ismi boş olamaz");
  } else{
    socket.emit("create", {
        name: roomName.value
    })
  }
});


socket.on("prev-rooms", function (data) {
    data.rooms.forEach(function (room) {
        addRoom(room);
    });
})

socket.on("create", function(data){
    addRoom(data.name);
})

function addRoom(roomName){
  rooms.innerHTML += `<div class="col-6 my-3">
    <div class="room-back">
      <div class="room-wrap">
        <div class="h4">${roomName}</div>
        <div class="h6">Kişi Sayısı: <strong>2/2</strong></div>
        <br />
        <button class="btn btn-primary">Katıl</button>
      </div>
    </div>
  </div>`;
}

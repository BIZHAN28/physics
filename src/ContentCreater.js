class DayTable{
  constructor(name, contentArr, headcolor){
    let Table = document.createElement("div");
    Table.className = "table";
    let mineHead=document.createElement("span");
    mineHead.className="miniheader";
    mineHead.innerText=name;
    let mineBody=document.createElement("div");
    mineBody.className="TableBody";
    for(let i=0; i<contentArr.length; i++){
      let selement=document.createElement("span");
      selement.innerText=contentArr[i];
      selement.className="TableSpan";
      selement.appendChild(document.createElement("br"));
      mineBody.appendChild(selement);
    }
    if(headcolor==true){
      mineHead.className = "miniheader colored";
    }
    Table.appendChild(mineHead);
    Table.appendChild(mineBody);
    //document.getElementById("main").appendChild(Table);
    this.ContentTable=Table;
    this.DataArray=contentArr;
    this.name=name;
  }
  getTable(){
    return this.ContentTable;
  }
}
function getDay(){
  let days = [7, 1, 2, 3, 4, 5, 6];
  let d = new Date();
  let n = d.getDay();
  //console.log(days[n]);
  return days[n]
}
document.addEventListener('DOMContentLoaded', function(event) {
  let globalParent = document.getElementById("main");
  let toDel = document.getElementById("jsdontwork");
  toDel.remove();
  //globalParent.innerText = "IT WORKS AAAAAAAAA";
  //
  let columns=[document.createElement('div'), document.createElement('div'), document.createElement('div')];
  const Monday = new DayTable("Понедельник", ["Русский", "Химия", "История", "Ин.яз", "Матпракт", "Матпракт", "Русский"], getDay()==1);
  columns[0].appendChild(Monday.getTable());
  const Tuesday = new DayTable("Вторник", ["Геометрия", "Физра", "Биология", "Общество", "Физика", "История", "Литра"], getDay()==2);
  columns[1].appendChild(Tuesday.getTable());
  const Wednesday = new DayTable("Среда", ["Физра", "Физика", "Ин.яз", "Общество", "Алгебра", "Биология"], getDay()==3);
  columns[2].appendChild(Wednesday.getTable());
  const Thursday = new DayTable("Четверг", ["ИСТАВрия","Химия", "Литра", "Алгебра", "Алгебра", "Русский", "Литра"], getDay()==4);
  columns[0].appendChild(Thursday.getTable());
  const Friday = new DayTable("Пятница", ["Ин.яз", "ОБЖ", "География", "Информатика", "Геометрия", "Физра", "Литра"], getDay()==5);
  columns[1].appendChild(Friday.getTable());
  columns[0].className="split left";
  columns[1].className="split middle"
  columns[2].className="split right";;
  globalParent.appendChild(columns[0]);
  globalParent.appendChild(columns[1]);
  globalParent.appendChild(columns[2]);
});

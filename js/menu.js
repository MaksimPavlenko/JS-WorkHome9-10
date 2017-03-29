//div-ка с менюшками. Если блоков с меню несколько, например слева и справа, тогда два вызова, для каждого блока.
var menuBlock=document.getElementById('menu');
setClassSubmenu(menuBlock);

/*Поддержка "no javascript" режима браузера. Если js выключен, то подменю получат стиль по умолчанию, иначе скрипт назначит особый стиль для подменю. Другой вариант - забить на убогих, и сразу в HTML-коде назначать стили "js_submenu" для элементов подменю. Тогда эта функция и ее вызов выше не нужны.*/
//Обход всех дочерних элементов принадлежащих блоку меню.
function setClassSubmenu(n){               //~Фленаган, с.334
	if (n.nodeType!=1) return              //Node.ELEMENT_NODE. Проверяем, что n - элемент, а не текст, например.
	if (n.className.search('submenu')>-1) n.className='js_submenu';
	var children=n.childNodes;             //Теперь получаем все дочерние элементы n
	for(var i=0; i<children.length; i++) { //Цикл по всем дочерним элементам с рекурсией
		setClassSubmenu(children[i]);
	}
}

/*Оч. простая, но важная процедура: выясняем индекс первого дочернего div-элемента. Все дело в том, что индекс этого элемента в дереве childNodes зависит от наличия и количества переносов строк между ним и родителем. Причем эти переносы бразузеры считают по-разному.*/
function getNodeIdx(obj){
	var i=0;
	while (obj.childNodes[i].nodeName!='DIV') i++;
	return i;
}

/*Обрабочик события можно навесить более грамотно, чем в свойствах элемента. Но так нагляднее, Я думаю.
При движении мыши над субменю эта функция вызывается многократно!! Все потому, что корневой элемент много раз теряет и получает мышу. Теряет, когда курсор наводится на его дочерний элемент. Находит из-за всплывания события над дочерним элементом. В любом случае общая картина выглядит нормально.
Это обобщенный обработчик для верт. и горизонт. меню. Если нужно только вертикальное, тогда первый блок с расчетом координат можно выпилить. Если меню нужно открывать в другую сторону, тогда подправить расчет координат и все :) Конечно при этом CSS и НТМL описания менюшек должны быть правильными.*/
function toggleMenu(event,obj){
	event=event||window.event;
	if (event.type=='mouseover'){
		var idx=getNodeIdx(obj);
		//Если первое подменю вызвывается из div, значит блок горизонтальный.
		if (obj.nodeName=='DIV'){//первое подменю размещаем прямо под корневым уровнем.
			obj.childNodes[idx].style.top=(obj.offsetTop+obj.offsetHeight)+'px'; //Для горизонтального меню здесь другие координаты
			obj.childNodes[idx].style.left=(obj.offsetLeft-1)+'px';
		}
		else {                   //любые другие уровни подменю смещаем вниз влево
			obj.childNodes[idx].style.top=(obj.offsetTop+obj.offsetHeight/2)+'px';
			obj.childNodes[idx].style.left=(obj.offsetWidth*0.80)+'px';
		}
		obj.childNodes[idx].style.visibility='visible';
		obj.style.backgroundColor='rgba(3, 63, 99, 0.3)';
	}
	else{
		obj.style.visibility='hidden';
		obj.parentNode.style.backgroundColor='transparent';
	}
}

//Событие родительского меню. Мышь покидает элемент
function parentMenuOut(event,obj) {
	event=event||window.event;
	 var relTrgt = event.relatedTarget || event.toElement;//W3C || IE
	 var idx=getNodeIdx(obj);
	 if (relTrgt!=obj.childNodes[idx]) //Если элемент-получатель мыши не соответствует дочернему подменю, то скрываем подменю
	 {	obj.childNodes[idx].style.visibility='hidden';
		obj.style.backgroundColor='transparent'; }
}
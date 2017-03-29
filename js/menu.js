//div-�� � ���������. ���� ������ � ���� ���������, �������� ����� � ������, ����� ��� ������, ��� ������� �����.
var menuBlock=document.getElementById('menu');
setClassSubmenu(menuBlock);

/*��������� "no javascript" ������ ��������. ���� js ��������, �� ������� ������� ����� �� ���������, ����� ������ �������� ������ ����� ��� �������. ������ ������� - ������ �� ������, � ����� � HTML-���� ��������� ����� "js_submenu" ��� ��������� �������. ����� ��� ������� � �� ����� ���� �� �����.*/
//����� ���� �������� ��������� ������������� ����� ����.
function setClassSubmenu(n){               //~��������, �.334
	if (n.nodeType!=1) return              //Node.ELEMENT_NODE. ���������, ��� n - �������, � �� �����, ��������.
	if (n.className.search('submenu')>-1) n.className='js_submenu';
	var children=n.childNodes;             //������ �������� ��� �������� �������� n
	for(var i=0; i<children.length; i++) { //���� �� ���� �������� ��������� � ���������
		setClassSubmenu(children[i]);
	}
}

/*��. �������, �� ������ ���������: �������� ������ ������� ��������� div-��������. ��� ���� � ���, ��� ������ ����� �������� � ������ childNodes ������� �� ������� � ���������� ��������� ����� ����� ��� � ���������. ������ ��� �������� ��������� ������� ��-�������.*/
function getNodeIdx(obj){
	var i=0;
	while (obj.childNodes[i].nodeName!='DIV') i++;
	return i;
}

/*��������� ������� ����� �������� ����� ��������, ��� � ��������� ��������. �� ��� ���������, � �����.
��� �������� ���� ��� ������� ��� ������� ���������� �����������!! ��� ������, ��� �������� ������� ����� ��� ������ � �������� ����. ������, ����� ������ ��������� �� ��� �������� �������. ������� ��-�� ���������� ������� ��� �������� ���������. � ����� ������ ����� ������� �������� ���������.
��� ���������� ���������� ��� ����. � ��������. ����. ���� ����� ������ ������������, ����� ������ ���� � �������� ��������� ����� ��������. ���� ���� ����� ��������� � ������ �������, ����� ���������� ������ ��������� � ��� :) ������� ��� ���� CSS � ���L �������� ������� ������ ���� �����������.*/
function toggleMenu(event,obj){
	event=event||window.event;
	if (event.type=='mouseover'){
		var idx=getNodeIdx(obj);
		//���� ������ ������� ����������� �� div, ������ ���� ��������������.
		if (obj.nodeName=='DIV'){//������ ������� ��������� ����� ��� �������� �������.
			obj.childNodes[idx].style.top=(obj.offsetTop+obj.offsetHeight)+'px'; //��� ��������������� ���� ����� ������ ����������
			obj.childNodes[idx].style.left=(obj.offsetLeft-1)+'px';
		}
		else {                   //����� ������ ������ ������� ������� ���� �����
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

//������� ������������� ����. ���� �������� �������
function parentMenuOut(event,obj) {
	event=event||window.event;
	 var relTrgt = event.relatedTarget || event.toElement;//W3C || IE
	 var idx=getNodeIdx(obj);
	 if (relTrgt!=obj.childNodes[idx]) //���� �������-���������� ���� �� ������������� ��������� �������, �� �������� �������
	 {	obj.childNodes[idx].style.visibility='hidden';
		obj.style.backgroundColor='transparent'; }
}
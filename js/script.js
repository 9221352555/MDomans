/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var max_index = 0;

//находит минимальное в массиве
function getMinOfArray(numArray) {
    var ret=0;
    $.each(numArray,function(index,value){
        if(ret==0)ret=value;
        if(value>0 && value<ret)ret=value;
    });
  return ret;
}


//GetCellIndex - вычисляет и возвращает индекс ячейки
function GetCellIndex(y,x){
    //находим индекс элемента
    var selector_root = ".workinput[cell_m="+y+"][cell_n="+x+"]";
    if($(selector_root).val()>0){
        var index_array = [];
        for(var pos_y = y-1; pos_y <= y+1; pos_y++){
            var pos_x = 0;
            for(var pos_x = x-1; pos_x <= x+1; pos_x++){
                var selector = ".workinput[cell_m="+pos_y+"][cell_n="+pos_x+"]";
                if($("#work *").is(selector)){
                    if($(selector).attr("cell_index")>0){
                        var tmp_index = $(selector).attr("cell_index");
                        if(tmp_index)index_array.push(tmp_index);
                    }
                }
            };
        };
        cell_index = getMinOfArray(index_array);
        if(!cell_index)cell_index=0;
        if(cell_index==0){max_index++;cell_index = max_index;}
        $(selector_root).attr("cell_index",cell_index);
    }
}

function GetCountDomens(){
    var sc = [];
    //$(".workinput[cell_index>0]").each(function(){arr.push($(this).attr("cell_index"));}).ready(function(){return (new Set(arr)).length;});
    return 1;
}
  

$( function() {
    $.fn.viewMatrix = function(){
        var ret = "";
        for(var y=1; y <= $("#m").val(); y++){
          ret = ret + "<TR>";
          for(var x=1; x <= $("#n").val(); x++){
            var cell_index=0;
            ret = ret + "<TD>";
            //ret = ret + "[" + y + ":" + x + " : "+this.data[y][x]+"]";
            //ret = ret + "[" + y + ":" + x +"]";
            //if((x==1&&y==1)||(x==1&&y==2))cell_index=1;
            ret = ret + "<input \n\
                class='workinput' \n\
                type='text' \n\
                cell_n='"+x+"'\n\
                cell_m='"+y+"'\n\
                cell_index='"+cell_index+"'\n\
                id='p_"+y+"_"+x+"' \n\
                name='p_"+y+"_"+x+"' \n\
                value='0' \n\
                pattern='\d [0-1]' \n\
                maxlength=1 \n\
                ondblclick='$(this).WorkInputClick(); return false;' \n\
                onchange='$(this).WorkInputValidation(); return false;'\n\
            >";
            ret = ret + "</TD>";              
          }
          ret = ret + "</TR>";          
      }
        $("#work").html(ret);
  };


    //matrix = new MatrixClass($("#n").val(),$("#m").val());
    $.fn.WorkInputValidation = function(){
        var keys = ["0","1"];
        if(keys.indexOf($(this).val()) === -1) $(this).val("0");
    };
    $.fn.WorkInputClick = function(){
        if($(this).val()==="1")$(this).val("0"); else $(this).val("1");
    };
    
    $.fn.WorkCell = function(){
        //GetCellIndex($(this).attr("cell_m"),$(this).attr("cell_n"));
        $(".message").append("aaaa<BR>");
    };

    $.fn.Domans = function(){
        max_index = 0;
        $(".workinput").attr("cell_index","0").ready(function(){
            var sc=0;
            var citeration=1;
            var domens_name = $("#domens").html();
            do{
                sc++;
                for(y=1; y<=$("#m").val();y++)
                    for(x=1; x<=$("#n").val();x++){
                        GetCellIndex(y,x);
                    }
            } while (sc < citeration);  

            var citeration=1;
            do{
                sc++;            
                for(x=1; x<=$("#n").val();x++)
                    for(y=1; y<=$("#m").val();y++){
                        GetCellIndex(y,x);
                    }
            } while (sc < citeration);  
            $("#result").append("<TR class='result_tr'><TD>"+$("#possibility").val()+"</TD><TD>"+($().CD())+"</TD><TD>"+$("#n").val()+" x "+$("#m").val()+"</TD></TR>").ready(function(){if($(".result_tr").length>10) $(".result_tr:first").remove();});
        });
     };
     
     $.fn.CD = function(){
        var ret=[];
        for(var y=1; y <= $("#m").val(); y++)
          for(var x=1; x <= $("#n").val(); x++){
            var selector_root = ".workinput[cell_m="+y+"][cell_n="+x+"]";
            var cell_value = $(selector_root).attr("cell_index");
            if($.inArray(cell_value,ret)<0)
                if(cell_value>0) ret.push(cell_value);
            //var el = (selector_root).attr("cell_index");
          }
        return ret.length;
    }
         
    
    $("#auto").on("click",function(){
        $(".workinput").val(0).attr("cell_index",0).ready((function(){
            $(".workinput").each(function(){
                if(Math.random()<$("#possibility").val())$(this).val(1);
            });
        }));
    });
    
    $("#goworg").on("click",function(){$(this).viewMatrix();});
    
    $("#domens").on("click",function(){$(this).Domans();});
    
    
    
} );    


        //matrix = new MatrixClass($("#n").val(),$("#m").val());
        //matrix.initMatrix = $("#work input").serializeArray();
        //matrix.alertmatrix();
        
        //$("#work").html("").viewMatrix();
//        
//        $("#work").append(matrix.viewMatrix);        
    
    //var arr = $("#work input").serializeArray();


//    $(".work").on("keyup",".workinput",function(){
//        alert("f");
//    });

//    $("#work").on("click","td",function(){
//        alert($(this).attr("cell_n"));
//    });

    
//    $.fn.Auto = function(){
//        //matrix.initMatrix = $("#work input").serializeArray();
//        //matrix.alertmatrix();
//    };
    
    
    //this.data = [];

//    var ret = [];
//    for(var y=1; y <= m; y++){
//        var ret_x = [];
//        for(var x=1; x <= this.max_n; x++){ret_x.push(0);}
//        ret.push(ret_x);
//        }
    //this.data = ret;        
    
//  
//  initMatrix(){
//      this.data=[];
//      for(var y=1; y <= this.max_m; y++){
//          for(var x=1; x <= this.max_n; x++){
//              setData({"m":y,"n":x});
////              this.data[y][x] = {
////                  "weight":0,
////                  "color":0
////              };
//          }
//      }      
//  }
  
//
//    //структура ячейки, хранит статус, вес, цвет
//    function getStructCell(status,weight,color){
//        var ret ={};
//        ret.status = status;
//        ret.weight = weight;
//        ret.color = color;
//        return ret;
//    }
//    
//    //инициализация матрицы
//    function initMatrix(){
//        
//    }
//
//    //getMatrix() получает содержание матрицы в виде таблицы
//    function getMatrix(){
//        alert("ddf");
//        return false;
//    }
//
//    $("#goworg").on("click",function(){
//        for()
//    });
    //$("#work").append("<tr><td>2</td></tr>");



//class MatrixClass {
//  constructor(n, m) {
//    this.max_n = n; //n - внутренний X
//    this.max_m = m; //m - внешний Y
//    this.matrix_date = [];
//    
//    }
// 
// myRandom(ver){
//     return ver;
// }
// 
//
//    initXatrix(dat){
//        //split
//    }
//    //initMatrix - инициализация матрицы
//    //possibility массив с данными  .serializeArray() [{name: "a",value: "1"},{name: "b",value: "2"},]
//    
//    set initMatrix(possibility){
//        //собираем пустую матрицу
//        var mas = [];
//        for (var y = 0; y < this.max_m; y++){
//            mas[y] = [];
//            for (var x = 0; x < this.max_n; x++){
//                mas[y][x] = 0;
//            }
//        }
//        //читаем и разбираем входящее значение possibility
//        $.each(possibility,function(index,value){
//            var mas_name = value.name.split("_");
//            if(mas_name.length>1){
//                mas[mas_name[1]][mas_name[2]] = value;
//            }
//            //$("div").append("["+value.name+" "+value.value+"]");
//        });
//        //alert(JSON.stringify(mas));
//        this.matrix_data = mas;
////        if(!possibility)possibility=0;
////        for(var y=1; y <= this.max_m; y++)
////            for(var x=1; x <= this.max_n; x++){
////                this.matrix_data.push()
////            }
//        
//    }
//    
//    
//    //isinitMatrix - проверяет инициализирована ли матрица
//    get isinitMatrix(){return this.matrix_date.length>0;}
//    
//    //viewMatrix - возвращает HTML код с матрицей
//    get viewMatrix() {
//  }
//  
  
//   //служебная - показать матрицу 
//   alertmatrix(){alert(JSON.stringify(matrix.matrix_data));}
//    
//    
//}


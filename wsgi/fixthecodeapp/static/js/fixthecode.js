/*
 * Compressed library code
 */

// Angular-ui sortable compressed
angular.module("ui.sortable",[]).value("uiSortableConfig",{}).directive("uiSortable",["uiSortableConfig",function(e){return{require:"?ngModel",link:function(t,n,r,i){function s(e,t){if(t&&typeof t==="function"){return function(n,r){e(n,r);t(n,r)}}return e}var o={};var u={receive:null,remove:null,start:null,stop:null,update:null};angular.extend(o,e);if(i){i.$render=function(){n.sortable("refresh")};u.start=function(e,t){t.item.sortable={index:t.item.index()}};u.update=function(e,t){t.item.sortable.resort=i};u.receive=function(e,t){t.item.sortable.relocate=true;i.$modelValue.splice(t.item.index(),0,t.item.sortable.moved)};u.remove=function(e,t){if(i.$modelValue.length===1){t.item.sortable.moved=i.$modelValue.splice(0,1)[0]}else{t.item.sortable.moved=i.$modelValue.splice(t.item.sortable.index,1)[0]}};u.stop=function(e,n){if(n.item.sortable.resort&&!n.item.sortable.relocate){var r,i;i=n.item.sortable.index;r=n.item.index();n.item.sortable.resort.$modelValue.splice(r,0,n.item.sortable.resort.$modelValue.splice(i,1)[0])}if(n.item.sortable.resort||n.item.sortable.relocate){t.$apply()}}}t.$watch(r.uiSortable,function(e,t){angular.forEach(e,function(e,t){if(u[t]){e=s(u[t],e)}n.sortable("option",t,e)})},true);angular.forEach(u,function(e,t){o[t]=s(e,o[t])});n.sortable(o)}}}])

// Rainbow.js generic syntax compressed
Rainbow.extend([{matches:{1:{name:"keyword.operator",pattern:/\=/g},2:{name:"string",matches:{name:"constant.character.escape",pattern:/\\('|"){1}/g}}},pattern:/(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm},{name:"comment",pattern:/\/\*[\s\S]*?\*\/|(\/\/|\#)[\s\S]*?$/gm},{name:"constant.numeric",pattern:/\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi},{matches:{1:"keyword"},pattern:/\b(and|array|as|b(ool(ean)?|reak)|c(ase|atch|har|lass|on(st|tinue))|d(ef|elete|o(uble)?)|e(cho|lse(if)?|xit|xtends|xcept)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|(un)?signed|var|void|while)(?=\(|\b)/gi},{name:"constant.language",pattern:/true|false|null/g},{name:"keyword.operator",pattern:/\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g},{matches:{1:"function.call"},pattern:/(\w+?)(?=\()/g},{matches:{1:"storage.function",2:"entity.name.function"},pattern:/(function)\s(.*?)(?=\()/g}])

/*
 * Application code
 */

angular.module('directives', []).directive('ngVisible', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngVisible, function (visible) {
      element.css('visibility', visible ? 'visible' : 'hidden');
    });
  };
});

var app = angular.module('fixthecode', ['ui.sortable', 'directives']);

app.controller('FixTheCodeController', FixTheCodeController);

// Randomly shuffle the elements of an array
function shuffle(array) {
    var arrayClone = array.slice(0);

    // Shuffle until the array changes or we are at the 5th shuffle
    for(var i = 0; i < 5 && angular.equals(array, arrayClone); i++) {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    }

    return array;
}

// Return the longest line in a string
function getLongestLine(str) {
  var longestLine = '';
  var lines = str.split('\n');
  for(var i = 0; i < lines.length; i++) {
    if(lines[i].length > longestLine.length) {
      longestLine = lines[i];
    }
  }
  return longestLine;
}

function FixTheCodeController($scope, $http) {

    function initQuestion($scope) {
      var code = document.getElementById('question.code').value;
      $scope.answer = code.split('\n');

      $scope.incorrectLines = [];
      var incorrectLines = document.getElementById('question.incorrectLines').value;
      if(incorrectLines != '') {
        $scope.incorrectLines = incorrectLines.split('\n');
      }

      // The question has been loaded so we can delete the placeholders
      document.getElementById('question.code').remove();
      document.getElementById('question.incorrectLines').remove();

      $scope.programListSize = 'big';
      if(getLongestLine(code).length >= 40) {
        $scope.programListSize = 'small';
      } else if(getLongestLine(code).length >= 33) {
        $scope.programListSize = 'medium';
      }

      $scope.commentChars = '//';

      $scope.lines = [];

      function newLine(code) {
          return {'code': code};
      }

      for(var i in $scope.answer) {
          $scope.lines.push(newLine($scope.answer[i]));
      }

      for(var i in $scope.incorrectLines) {
          $scope.lines.push(newLine($scope.incorrectLines[i]));
      }

      $scope.lines = shuffle($scope.lines);
      $scope.checkDisabled = false;
      $scope.$apply();
      Rainbow.color();
    }

    initQuestion($scope);

    $scope.sortableOptions = {
        axis: "y",
        distance: 5,
        revert: 150
    }

    function winSequence(doneCallback) {
        delay = 0;
        $('#programList li').each(function(index, element) {
          setTimeout(function() {
              $(element).addClass('correct');
          }, delay);
          /*
          setTimeout(function() {
              $(element).removeClass('correct');
              $('.greenTick').removeClass('shown');
              $('#programList').removeClass('correct');
              doneCallback();
          }, 5000);
          */
          delay += 100;
      });
      setTimeout(function() {
          $('.greenTick').addClass('shown');
          $('#programList').addClass('correct');
      }, delay);
    }

    function failSequence(doneCallback) {
        //$('#programList li').each(function(index, element) {
            //$(element).addClass('incorrect');
        //});
        setTimeout(function() {
            $('#programList').addClass('incorrect');
            $('.redCross').addClass('shown');
        }, 0);

        setTimeout(function() {
            $('#programList li').each(function(index, element) {
                $('#programList').removeClass('incorrect');
                $('.redCross').removeClass('shown');
            });
            doneCallback();
        }, 1500);

    }

    $scope.checkAnswer = function() {
        if($scope.checkDisabled) {
            return;
        }

        $scope.checkDisabled = true;

        function joinLines(lines) {
            var out = "";
            for(var i = 0; i < lines.length; i++) {
                if(!lines[i].commented) {
                    out += lines[i].code;
                }
            }
            return out.replace(/\s/g, '');
        }

        var correctAnswer = $scope.answer.join('').replace(/\s/g, '');
        var programText = joinLines($scope.lines);

        enableCheck = function() {
            $scope.checkDisabled = false;
            $scope.$apply();
        }

        if(programText == correctAnswer) {
            winSequence(enableCheck);
        } else {
            failSequence(enableCheck);
        }
        
    }

    $scope.toggleComment = function(line) {
        line.commented = !line.commented;
    }
}


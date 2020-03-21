import data from './pens.json';

(function() {
  'use strict';

  var querySelector = document.querySelector.bind(document),
      $pensContainer = querySelector('#pens-container'),
      //$filtersContainer = querySelector('#filters-container'),
      tags = [];

  function createNewA(url){
    var newA = document.createElement('a');

    newA.setAttribute('href',  url  || '#');

    return newA;
  }

  function newTag(text){
    var tag = createNewA(),
        tagContent = document.createTextNode(text);

    tag.classList.add('tag', 'filter');
    tag.appendChild(tagContent);

    return tag;
  }

  /* Generate:
    <li class="clearfix js-daily-pen">
      <h2 class="name">
        <a href="#"><PEN TITLE></a>
      </h2>
      <div class="tags-container">
        <a href="#" class="tag"><TAG NAME></a>*pen.tags
      </div>
      <div class="date">
        <DATE>
      </div>
    </li>
  */
  function addPen(pen){

    var newLi = document.createElement('li'),
        newH2 = document.createElement('h2'),
        newLinkToPen = createNewA(pen.url),
        newH2Content = document.createTextNode(pen.name),
        newTags = document.createElement('div'),
        newDate = document.createElement('div'),
        newDateContent = document.createTextNode(pen.date),
        penTags = pen.tags.split(','),
        i = 0,
        tag;

    for (i = penTags.length - 1; i >= 0; i--) {
      tag = penTags[i].trim();
      newTags.appendChild( newTag( tag ) );
      //add class to filter elements by tag
      newLi.classList.add( 'js-' + tag.replace(/\s/g, '-') );
      if(tags.indexOf(tag) === -1){
        tags.push(tag);
      }
    };

    //add classes
    newLi.classList.add('clearfix', 'js-daily-pen');
    newH2.classList.add('name');
    newTags.classList.add('tags-container');
    newDate.classList.add('date');

    newLinkToPen.appendChild(newH2Content);
    newH2.appendChild(newLinkToPen);
    newLi.appendChild(newH2);
    newLi.appendChild(newTags);
    newDate.appendChild(newDateContent);
    newLi.appendChild(newDate);

    $pensContainer.appendChild(newLi);
  }

  // function addTagFilter(tag){
  //   var tagFilterLi = document.createElement('li'),
  //       tagFilterA = createNewA();

  //       tagFilterA.classList.add('filter');

  //       tagFilterA.appendChild( document.createTextNode( tag ) )
  //       tagFilterLi.appendChild( tagFilterA );

  //   $filtersContainer.appendChild( tagFilterLi );
  // }

  //to implement soon
  document.onclick = function(e){

      var target = e.target || e.srcElement;
          //filter;

      //filter 'a' don't work until implement filter
      if( target.classList.contains('filter') ){
        return false;
      }

      // filter = element.getAttribute('data-filter');


      // if( !target.classList.contains('filter') ){
      //   return
      // }
  };

    var i;
    var pens = data;
    //var allFilter
    for (i = pens.length - 1; i >= 0; i--) {
      addPen( pens[i] )
    };

    //to implement soon
    // for (var i = tags.length - 1; i >= 0; i--) {
    //   addTagFilter( tags[i] );
    // };

})();
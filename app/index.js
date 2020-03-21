import data from './pens.json';

(function() {
  'use strict';

  var querySelector = document.querySelector.bind(document),
      $pensContainer = querySelector('#pens-container'),
      //$filtersContainer = querySelector('#filters-container'),
      tags = [];

  function createAnchor(url){
    var newA = document.createElement('a');

    newA.setAttribute('href',  url  || '#');

    return newA;
  }

  function createTextNode(text){
    return document.createTextNode(text);
  }

  function newTag(text){
    var tag = createAnchor();

    tag.classList.add('tag', 'filter');
    tag.appendChild( createTextNode(text) );

    return tag;
  }

  function createListItem(){
    var item = document.createElement('li');
    item.classList.add('clearfix', 'js-daily-pen');

    return item;
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

    var li = createListItem(),
        title = document.createElement('h2'),
        link = createAnchor(pen.url),
        tagsContainer = document.createElement('div'),
        dateContainer = document.createElement('div'),
        tag;

    pen.tags.split(',').forEach(function(pen){
      tag = pen.trim();
      tagsContainer.appendChild( newTag( tag ) );
      //add class to filter elements by tag
      li.classList.add( 'js-' + tag.replace(/\s/g, '-') );
      if(tags.indexOf(tag) === -1){
        tags.push(tag);
      }
    });

    //add classes

    title.classList.add('name');
    tagsContainer.classList.add('tags-container');
    dateContainer.classList.add('date');

    link.appendChild( createTextNode(pen.name) );
    title.appendChild(link);
    li.appendChild(title);
    li.appendChild(tagsContainer);
    dateContainer.appendChild( createTextNode(pen.date) );
    li.appendChild(dateContainer);

    $pensContainer.appendChild(li);
  }

  // function addTagFilter(tag){
  //   var tagFilterLi = document.createElement('li'),
  //       tagFilterA = createAnchor();

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

  pens.forEach(function(pen){
    addPen( pen );
  });

    //to implement soon
    // for (var i = tags.length - 1; i >= 0; i--) {
    //   addTagFilter( tags[i] );
    // };

})();
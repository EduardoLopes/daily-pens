import pens from './pens.json';
import _array from 'lodash/array';

(function() {
  'use strict';

  var querySelector = document.querySelector.bind(document),
      querySelectorAll = document.querySelectorAll.bind(document),
      $pensContainer = querySelector('#pens-container'),
      $filtersContainer = querySelector('#filters-container'),
      tags = [],
      filters = [];

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
    item.classList.add('clearfix', 'daily-pen');

    return item;
  }

  /* Generate:
    <li class="clearfix daily-pen">
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
      li.classList.add( 'tag-' + tag.replace(/\s/g, '-') );
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

  function addTagFilter(tag){
    var li = document.createElement('li'),
        a = createAnchor();

        a.classList.add('filter');

        a.setAttribute('data-filter', tag.replace(/\s/g, '-'));

        a.appendChild( createTextNode( tag ) )
        li.appendChild( a );

    $filtersContainer.appendChild( li );
  }

  //to implement soon
  $filtersContainer.onclick = function(e){

    var target = e.target || e.srcElement;

    //filter 'a' don't work until implement filter
    if( target.classList.contains('filter') === false ){
      return false;
    }

    clearFilters();

    if(filters.includes(target.getAttribute('data-filter'))){

      filters = filters.filter(function(item) {
        return item !== target.getAttribute('data-filter')
      });

      target.classList.remove('active');

      console.log(filters);

      if(filters.length !== 0){
        applyFilters();
      }

      return false;
    }

    filters.push(target.getAttribute('data-filter'));
    target.classList.add('active');
    applyFilters();

  };

  function filtersToSelectors(){

    var selectors = filters.map(function(current, item, index){
      return `.tag-${current}`
    });

    return selectors.toString();

  }

  function applyFilters(){

    var allPens = [].slice.call(querySelectorAll('.daily-pen'));
    var pensToShow = [].slice.call(querySelectorAll(filtersToSelectors()));

    var hide = _array.difference(allPens, pensToShow);

    hide.forEach(function(item){
      item.classList.add('hide');
    });

  }

  function clearFilters(){
    var elements = querySelectorAll('.daily-pen');
    elements.forEach(function(item){
      item.classList.remove('hide');
    });
  }

  pens.forEach(function(pen){
    addPen( pen );
  });

  tags.forEach(function(item){
    addTagFilter(item);
  });

})();
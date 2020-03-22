import pens from "./pens.json";
import _array from "lodash/array";

var querySelector = document.querySelector.bind(document),
  querySelectorAll = document.querySelectorAll.bind(document),
  $pensContainer = querySelector("#pens-container"),
  $filtersContainer = querySelector("#filters-container"),
  tags = [],
  filters = [];

function createAnchor(url) {
  var a = document.createElement("a");

  a.setAttribute("href", url || "#");

  return a;
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function newTag(text) {
  var tag = createAnchor();

  tag.classList.add("tag", "filter");
  tag.appendChild(createTextNode(text));

  return tag;
}

function createTagSpan(text) {
  var span = document.createElement("span");

  span.classList.add("tag");
  span.appendChild(createTextNode(text));

  return span;
}

function createListItem() {
  var item = document.createElement("li");
  item.classList.add("clearfix", "daily-pen");

  return item;
}

/* Generate this:
  <li class="clearfix daily-pen tag-canvas">
    <h2 class="name">
      <a href="https://codepen.io/EduardoLopes/pen/tpKah" rel="noopener noreferrer" target="_blank">
        #1 - Click to see Circles
      </a>
    </h2>
    <div class="date">
      07.01.2014
    </div>
    <div class="tags-container clearfix">
      <span class="tag">
        canvas
      </span>
    </div>
  </li>
*/
function addPen(pen) {
  var li = createListItem(),
    title = document.createElement("h2"),
    link = createAnchor(`https://codepen.io/EduardoLopes/pen/${pen.codepen_id}`),
    tagsContainer = document.createElement("div"),
    dateContainer = document.createElement("div"),
    tag;

  link.setAttribute("rel", "noopener noreferrer");
  link.setAttribute("target", "_blank");

  pen.tags.split(",").forEach(function(pen) {
    tag = pen.trim();
    tagsContainer.appendChild(createTagSpan(tag));
    //add class to filter elements by tag
    li.classList.add("tag-" + tag.replace(/\s/g, "-"));
    if (tags.indexOf(tag) === -1) {
      tags.push(tag);
    }
  });

  //add classes

  title.classList.add("name");
  tagsContainer.classList.add("tags-container", "clearfix");
  dateContainer.classList.add("date");

  link.appendChild(createTextNode(`#${pen.id} - ${pen.name}`));
  title.appendChild(link);
  li.appendChild(title);
  dateContainer.appendChild(createTextNode(pen.date));
  li.appendChild(dateContainer);
  li.appendChild(tagsContainer);

  $pensContainer.appendChild(li);
}

function addTagFilter(tag) {
  var li = document.createElement("li"),
    a = createAnchor();

  a.classList.add("filter");

  a.setAttribute("data-filter", tag.replace(/\s/g, "-"));

  a.appendChild(createTextNode(tag));
  li.appendChild(a);

  $filtersContainer.appendChild(li);
}

//to implement soon
$filtersContainer.onclick = function(e) {
  var target = e.target || e.srcElement;

  if (target.classList.contains("filter") === false) {
    return false;
  }

  clearFilters();

  if (filters.includes(target.getAttribute("data-filter"))) {
    filters = filters.filter(function(item) {
      return item !== target.getAttribute("data-filter");
    });

    target.classList.remove("active");

    console.log(filters);

    if (filters.length !== 0) {
      applyFilters();
    }

    return false;
  }

  filters.push(target.getAttribute("data-filter"));
  target.classList.add("active");
  applyFilters();
};

function filtersToSelectors() {
  var selectors = filters.map(function(current, item, index) {
    return `.tag-${current}`;
  });

  return selectors.toString();
}

function applyFilters() {
  var allPens = [].slice.call(querySelectorAll(".daily-pen"));
  var pensToShow = [].slice.call(querySelectorAll(filtersToSelectors()));

  var hide = _array.difference(allPens, pensToShow);

  hide.forEach(function(item) {
    item.classList.add("hide");
  });
}

function clearFilters() {
  var elements = querySelectorAll(".daily-pen");
  elements.forEach(function(item) {
    item.classList.remove("hide");
  });
}

pens.forEach(function(pen) {
  addPen(pen);
});

tags.forEach(function(item) {
  addTagFilter(item);
});

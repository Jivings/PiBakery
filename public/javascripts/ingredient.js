$(function() {
  
  var Ingredient = Backbone.Model.extend({
    defaults: function() {
      return {
        os            : 'Arch Linux',
        name          : 'Unnamed',
        category      : 'Uncategorised',
        summary       : 'No summary',
        description   : 'No description',
        required      : false,
        dependancies  : []
      };
    },

    initialize: function() {
      for ( def in this.defaults() ) {
        if (!this.get(def)) {
          this.set({
            def : this.defaults()[def]
          });
        }
        else {
          alert('A field has not been filled.')
        }
      };
    },

    toggle : function() {
      this.required = !required;
    }
  });

  var IngredientList = Backbone.Collection.extend({
    model : Ingredient,
    url : "/ingredients"

  });

  // Hold a global collection of Ingredients
  var Recipe = new IngredientList;

  var IngredientView = Backbone.View.extend({
    // an ingredient item is a list element
    tagname  : 'li',
    // cache the template of an individual ingredient
    template : _.template($('#ingredient-template').html()),
    // the DOM events for a specific element
    events   : {
      'click' : 'toggle'
    },

    initialize : function() {
      this.icon = this.$('.icon img');
      this.name = this.$('.name');
      this.description = this.$('.description');
      // the model wont change on the fly so we dont 
      // need to attach any change handlers
    },

    // if the ingreident is selected toggle a tick
    toggle     : function() {
      this.model.toggle();
      this.$el.toggleClass('checked', this.model.get('checked')); 
    },

    render     : function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('checked', this.model.get('required')); 
    }
  });


  var IngredientListView = Backbone.View.extend({
    el : $('#main'),
    initialize : function() {
      Recipe.fetch();
    }

  });

  var bakery = new IngredientListView;
});
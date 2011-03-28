/**
 * ExtJS hack: Add multiple toolbars to a Panel
 *
 * @author Alexandr Andrianov (zloydadka@gmail.com)
 * 
 */
Ext.Panel.prototype.onRender_old = Ext.Panel.prototype.onRender;
Ext.Panel.prototype.initComponent_old = Ext.Panel.prototype.initComponent;
Ext.override(Ext.Panel, {
    initComponent: function (){
        var x = function (o, r, p) {
            if (!(o && Ext.isArray(r))) return;
            this['row'+p+'bars'] = [];
            for(var i = 0; i < r.length; i ++) this['row'+p+'bars'].push(new Ext.Toolbar(r[i]));
        }.createDelegate(this);

        x(this.tbar, this.rowtbar, 't');
        x(this.bbar, this.rowbbar, 'b');
        this.initComponent_old();
       
    },
    onRender: function(ct, position) {
        this.onRender_old(ct, position);
        var x = function (o, p) {
            if (!(this['row'+p+'bars'] && o)) return;
            Ext.iterate(this['row'+p+'bars'], function(r) {
                r.render(o.container)
            });
        }.createDelegate(this);
        
        x(this.topToolbar, 't');
        x(this.bottomToolbar, 'b');
    },
    getTopRowToolbar: function(id) {
        return this.getRowToolbar(id, 't');
    },
    getBottomRowToolbar:function(id) {
        return this.getRowToolbar(id, 'b');
    },
    getTopRowToolbars: function() {
      return this['rowtbars'];
    },
    getBottomRowToolbars: function() {
      return this['rowbbars'];
    },
    getRowToolbar: function(id, px) {
        return this['row'+px+'bars'] ? this['row'+px+'bars'][id] : null;
    }
});

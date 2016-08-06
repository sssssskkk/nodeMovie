var Category = require('../models/category.js');


exports.new= function(req, res){
    res.render('category_admin', {
        title: '后台分类录入',
        category:{}
    });
};

exports.save= function(req, res){
    var _category=req.body.category;
    var category=new Category(_category);
    category.save(function(err,category){
        if(err){
            res.redirect('/error');
        }
        res.redirect('/admin/category/list')
    })
};

exports.list= function(req, res){
    Category.fetch(
        function(err,categories){
            if(err){
                res.redirect('/error');
            }
            res.render('categorylist', {
                title: '分类列表页',
                categories:categories
            });
        }
    );
};


var Movie = require('../models/movie');
var Category = require('../models/category');
var Piaofang = require('../models/piaofang');

exports.index=function(req, res){
    Category
        .find({})
        .limit(14)
        .populate({path:'movies',options:{sort:{_id:-1}}})
        .exec(function(err,categories){
            Movie
                .find({'bannerid':{'$gt':0}})
                .sort({_id:-1})
                .exec(function(err,movies){
                    if(err){
                        res.redirect('/error');
                    }
			console.log(Date());
            console.log(categories);
                    res.render('index', {
                    title: '影院前线-院线热映电影-首页',
                    keywords:'影院前线_院线热映电影_电影爱好者',
                    description:'影院前线，为用户提供高清电影资源，同时推荐广受好评的各种经典电影。',
                    categories:categories , 
                    banners:movies
            });
                })
            if(err){
                res.redirect('/error');
            }
        })
}
exports.piaofang=function(req, res){
    Piaofang
        .find({status:0})
        .exec(function(err,nows){
            if(err){
                res.redirect('/error');
            }
            Piaofang
                .find({status:1})
                .exec(function(err,wills){
                    if(err){
                        res.redirect('/error');
                    }
                    res.render('piaofang', {
                        title: '影院前线-票房',
                        keywords:'影院前线_影院上映电影信息',
                        description:'影院前线_影院正在上映的电影信息，以及即将上映电影的信息预告',
                        nows:nows,
                        wills:wills
                })
            });

        })
}
exports.random=function(req,res){
    Category.findOne({findid:'6'})
    .exec(function(err,cat){
        if(err){
            res.redirect('/error');
        }
        var length=cat.movies.length;
        var num=Math.random()*length
        var ran=Math.floor(num)
        var movieId=cat.movies[ran];
        Movie.findById(movieId,function(err,movie){
            if(err){
                res.redirect('/error');
            }
            res.json({movie:movie})
        })
        
    })
}
exports.search=function(req, res){
    var catName=req.query.cat
    var page=parseInt(req.query.p,10) || 0
    var count=15         
    var q=req.query.q
    var index=page*count
    if(catName){
        Category
            .find({cat:catName})
            .populate({
                path:'movies',  
                options:{sort:{_id:-1}}
                })   
            .exec(function(err,categories){
                if(err){
                    res.redirect('/error');
                }
                var category=categories[0] || {}
                var movies=category.movies || []
                var results=movies.slice(index,index+count)
                res.render('resultcate', {
                    title: '好看的'+category.name+'电影-影院前线',
                    keywords:'影院前线_2016最新电影，各种种类电影信息及下载链接',
                    description:'影院前线_提供喜剧电影、爱情电影、科幻电影、恐怖电影、搞笑电影等国内外最新最热电影资源及下载链接。开始搜索找到你喜欢的电影吧',
                    keyword:category.name,
                    currentPage:(page+1) ,
                    query:'cat='+catName,        
                    totalPage:Math.ceil(movies.length/count),
                    movies:results  
                });
            })
        }else{
            res.redirect('/');
        }
}
exports.sousuo=function(req,res){
    var page=parseInt(req.query.p,10) || 0
    var count=10        
    var q=req.query.q
    var index=page*count
    var txt=new RegExp(q+'.*','i');    
    Movie
        .find({title:txt})
        .exec(function(err,movies){
            if(err){
                res.redirect('/error');
            }
            var results=movies.slice(index,index+count)
            res.render('sousuo', {
                title: q+'-电影搜索结果-影院前线',
                keywords:q+'电影，电影搜索结果，影院前线',
                description:'影院前线_提供喜剧电影、爱情电影、科幻电影、恐怖电影、搞笑电影等国内外最新最热电影资源及下载链接。开始搜索找到你喜欢的电影吧',
                keyword:q,
                currentPage:(page+1) ,
                query:'q=' + q,        
                totalPage:Math.ceil(movies.length/count),
                movies:results   
            });
        })
}
exports.part=function(req,res){
    var partName=req.query.choice
    var page=parseInt(req.query.p,10) || 0
    var count=15         
    var index=page*count
    if(partName){
        Movie
            .find({choice:partName})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword=movies[0].choice;
                var word='';
                switch (keyword){
                    case 'gn':
                    word='国内';
                    break;
                    case 'om':
                    word='欧美';
                    break;
                    case 'rh':
                    word='日韩';
                    break;
                    case 'qt':
                    word='其它';
                    break;
                    default:
                    break;

                }
                var results=movies.slice(index,index+count)
                res.render('resultpart',{
                    title:"好看的"+word+'电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:word,
                    currentPage:(page+1) ,
                    query:'choice='+partName,        
                    totalPage:Math.ceil(movies.length/count)
                })
            })
        }
    else{
        res.redirect('/');
    }

}
exports.year=function(req,res){
    var year=parseInt(req.query.year,10);
    var page=parseInt(req.query.p,10) || 0;
    var start=parseInt(req.query.start,10);
    var end=parseInt(req.query.end,10);
    var count=15          
    var index=page*count
    if(year&&year>=2007){
        Movie
            .find({year:year})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword=movies[0].year;
                
                var results=movies.slice(index,index+count)
                res.render('resultyear',{
                    title:"好看的"+keyword+'年电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    currentPage:(page+1) ,
                    query:'year='+year,        
                    totalPage:Math.ceil(movies.length/count)
                })
            })
        }
        else if(start&&start==2000&&end==2006){
            Movie
            .find({'year':{'$gte':2000,'$lte':2006}})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword='2000--2006'
                var results=movies.slice(index,index+count)
                res.render('resultfromto',{
                    title:"好看的"+keyword+'年电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    currentPage:(page+1) ,
                    start:start,
                    end:end,
                    totalPage:Math.ceil(movies.length/count)
                })
            })
        }
        else if(start&&start==1990&&end==1999){
            Movie
            .find({'year':{'$gte':1990,'$lte':1999}})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword='1990--1999'
                
                var results=movies.slice(index,index+count)
                res.render('resultfromto',{
                    title:"好看的"+keyword+'年电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    currentPage:(page+1) ,
                    start:start,
                    end:end,
                    totalPage:Math.ceil(movies.length/count)
                })
            })
        }else if(start&&start==1964&&end==1989){
            Movie
            .find({'year':{'$lte':1989}})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword='1990之前';
                
                var results=movies.slice(index,index+count)
                res.render('resultfromto',{
                    title:'好看的1990年之前电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    currentPage:(page+1) ,
                    start:start,
                    end:end,
                    totalPage:Math.ceil(movies.length/count)
                })
            })
        }
        else{
            res.redirect('/all?p=0');
        }
}
exports.findall=function(req,res){
    var page=parseInt(req.query.p,10) || 0
    var count=15;          
    var index=page*count
    Movie
        .find({})
        .sort({_id:-1})
        .exec(function(err,movies){
            if(err){
                res.redirect('/error');
            }
            var results=movies.slice(index,index+count)
            res.render('resultsList',{
                title:'全部电影-影院前线电影列表',
                keywords:'',
                description:'',
                keyword:'全部',
                movies:results,
                currentPage:(page+1),
                totalPage:Math.ceil(movies.length/count)
            })
        })
}
exports.error=function(req,res){
    res.render('error',{
        title:'页面出错'
    })
}


// -------mobile


exports.mIndex=function(req, res){
    Category
        .find({})
        .limit(14)
        .populate({path:'movies',options:{limit:6,sort:{_id:-1}}})
        .exec(function(err,categories){
            Movie
                .find({"mBanner": {$exists: true}})
                .sort({_id:-1})
                .exec(function(err,movies){
                    if(err){
                        res.redirect('/error');
                    }
            console.log(Date());
                    res.render('mIndex', {
                    title: '影院前线-院线热映电影-首页',
                    keywords:'影院前线_院线热映电影_电影爱好者',
                    description:'影院前线，为用户提供高清电影资源，同时推荐广受好评的各种经典电影。',
                    categories:categories , 
                    banners:movies
            });
                })
            if(err){
                res.redirect('/error');
            }
        })
}

exports.mFindall=function(req,res){
    // var page=parseInt(req.query.p,10) || 0
    var count=20;          
    // var index=page*count;
    Movie
        .find({})
        .sort({_id:-1})
        .limit(20)
        .exec(function(err,movies){
            if(err){
                res.redirect('/error');
            }
            var results=movies.slice(0,count)

            // console.log(results.length)

            res.render('mAll',{
                title:'全部电影-影院前线电影列表',
                keywords:'',
                description:'',
                keyword:'全部',
                movies:results
                // currentPage:(page+1),
                // totalPage:Math.ceil(movies.length/count)
            })
        })
}



exports.mFindCate=function(req, res){
    var catName=req.query.cat
    var page=parseInt(req.query.p,10) || 0
    var count=20         
    // var q=req.query.q
    // var index=page*count
    if(catName){
        Category
            .find({cat:catName})
            .populate({
                path:'movies',  
                options:{sort:{_id:-1}}
                })   
            .exec(function(err,categories){
                if(err){
                    res.redirect('/error');
                }
                var category=categories[0] || {}
                var movies=category.movies || []
                var results=movies.splice(0,count)
                res.render('mCates', {
                    title: '好看的'+category.name+'电影-影院前线',
                    keywords:'影院前线_2016最新电影，各种种类电影信息及下载链接',
                    description:'影院前线_提供喜剧电影、爱情电影、科幻电影、恐怖电影、搞笑电影等国内外最新最热电影资源及下载链接。开始搜索找到你喜欢的电影吧',
                    keyword:category.name,
                    // currentPage:(page+1) ,
                    query:'cat='+catName,        
                    // totalPage:Math.ceil(movies.length/count),
                    movies:results  
                });
            })
        }else{
            res.redirect('/');
        }
}




exports.mYear=function(req,res){
    var year=parseInt(req.query.year,10);
    var page=parseInt(req.query.p,10) || 0;
    var start=parseInt(req.query.start,10);
    var end=parseInt(req.query.end,10);
    var count=20          
    var index=page*count
    if(year&&year>=2007){
        Movie
            .find({year:year})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword=movies[0].year;
                
                var results=movies.splice(0,count)
                res.render('mYear',{
                    title:"好看的"+keyword+'年电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    // currentPage:(page+1) ,
                    query:'year='+year,        
                    // totalPage:Math.ceil(movies.length/count)
                })
            })
        }
        else if(start&&start==2000&&end==2006){
            Movie
            .find({'year':{'$gte':2000,'$lte':2006}})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword='2000--2006'
                var results=movies.splice(0,count)
                res.render('mYear',{
                    title:"好看的"+keyword+'年电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    // currentPage:(page+1) ,
                    start:start,
                    end:end,
                    // totalPage:Math.ceil(movies.length/count)
                })
            })
        }
        else if(start&&start==1990&&end==1999){
            Movie
            .find({'year':{'$gte':1990,'$lte':1999}})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword='1990--1999'
                
                var results=movies.slice(0,count)
                res.render('mYear',{
                    title:"好看的"+keyword+'年电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    // currentPage:(page+1) ,
                    start:start,
                    end:end,
                    // totalPage:Math.ceil(movies.length/count)
                })
            })
        }else if(start&&start==1964&&end==1989){
            Movie
            .find({'year':{'$lte':1989}})
            .sort({_id:-1})
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword='1990之前';
                
                var results=movies.slice(0,count)
                res.render('mYear',{
                    title:'好看的1990年之前电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:results,
                    keyword:keyword,
                    // currentPage:(page+1) ,
                    start:start,
                    end:end,
                    // totalPage:Math.ceil(movies.length/count)
                })
            })
        }
        else{
            res.redirect('/m/all');
        }
}



exports.mPart=function(req,res){
    var partName=req.query.choice
    // var page=parseInt(req.query.p,10) || 0
    var count=20         
    // var index=page*count
    if(partName){
        Movie
            .find({choice:partName})
            .sort({_id:-1})
            .limit(20)
            .exec(function(err,movies){
                if(err){
                    res.redirect('/error');
                }
                var keyword=movies[0].choice;
                var word='';
                switch (keyword){
                    case 'gn':
                    word='国内';
                    break;
                    case 'om':
                    word='欧美';
                    break;
                    case 'rh':
                    word='日韩';
                    break;
                    case 'qt':
                    word='其它';
                    break;
                    default:
                    break;

                }
                // var results=movies.slice(index,index+count)
                res.render('mPart',{
                    title:"好看的"+word+'电影-影院前线电影列表',
                    keywords:'',
                    description:'',
                    movies:movies,
                    // keyword:word,
                    // currentPage:(page+1) ,
                    query:'choice='+partName        
                    // totalPage:Math.ceil(movies.length/count)
                })
            })
        }
    else{
        res.redirect('/m/index');
    }

}



exports.mSousuo=function(req,res){
    // var page=parseInt(req.query.p,10) || 0
    var count=10        
    var q=req.query.q
    // var index=page*count
    var txt=new RegExp(q+'.*','i');    
    Movie
        .find({title:txt})
        .exec(function(err,movies){
            if(err){
                res.redirect('/error');
            }
            var results=movies.slice(0,count)
            res.render('mSousuo', {
                title: q+'-电影搜索结果-影院前线',
                keywords:q+'电影，电影搜索结果，影院前线',
                description:'影院前线_提供喜剧电影、爱情电影、科幻电影、恐怖电影、搞笑电影等国内外最新最热电影资源及下载链接。开始搜索找到你喜欢的电影吧',
                keyword:q,
               
                movies:results   
            });
        })
}
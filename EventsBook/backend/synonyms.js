var request = require('request');
var cheerio = require('cheerio');
var urlencode = require ('urlencode');
var _ = require("underscore");
_.str = require('underscore.string');
var fs = require("fs");

 function synonyms (word){
        var res = [];
        var url = "https://rechnik.chitanka.info/w/" + urlencode(word);
        
        request(url, function (error, response, body) {
            if (!error) {
                    var $ = cheerio.load(body);
                    var  word = $('.synonyms li a').each(function(i, elm) {
                        res.push($(this).text());
  
                    });
            if (res.length==0) {
                    var  newUrl = $('.meaning a').first().attr('href');
                    //console.log (newUrl);
                    url = "https://rechnik.chitanka.info" + newUrl;
	 
                    request(url, function (errornew, responsenew, bodynew) {
                        if (!errornew) {
                            $ = cheerio.load(bodynew);
                            var  syno = $('.synonyms li a').each(function(i, elm) {
                                res.push($(this).text());
                                });
                            }      
                        });
                    }
                }
                console.log(res);
            }

        )};
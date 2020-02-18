//Megane Dandurand
load("tweets-10.js");

var getTweetsEcrisPar = function(id){//getTweetsEcrisPar
    var arrayAuteurs =[];
    var indexAuteurs = [];
    for(var i=0; i<=tweets.length-1; i++){
        arrayAuteurs[i]= tweets[i].Auteur.ID;
    }
    for(i=0; i<=arrayAuteurs.length-1;i++){
        if(arrayAuteurs[i] === id){
            indexAuteurs.push(i);
        }
    }
    return indexAuteurs;
};

var getTweetsAvecHTag = function(tag){//getTweetsAvecHTag
    var arrayHTags =[];
    var indexHTags = [];
    for(var i=0; i<=tweets.length-1; i++){
        arrayHTags[i]= tweets[i].Hashtags;
    }
    for(i=0; i<=arrayHTags.length-1;i++){
        for(var j=0; j<arrayHTags[i].length;j++){
        if(arrayHTags[i][j] === tag){
            indexHTags.push(i);
        }
        }
    }
    return indexHTags;
};

var getTweetsEcrisParAuteurPopulaire = function(nb){//getTweetsEcrisParAuteurPopulaire
    var arrayAuteursPopu =[];
    var indexAuteursPopu = [];
    for(var i=0; i<=tweets.length-1; i++){
        arrayAuteursPopu[i]= tweets[i].Auteur.Friend_Count;
    }
    for(i=0; i<=arrayAuteursPopu.length-1;i++){
        if(arrayAuteursPopu[i] >=  nb){
            indexAuteursPopu.push(i);
        }
    }
    return indexAuteursPopu;
};

var getTweetsEnReponseAuTweet = function(id){//getTweetsEnReponseAuTweet
    var arrayIDResponse =[];
    for(var i=0; i<=tweets.length-1; i++){
        if(tweets[i].response_To_Tweet === id){//si c'est une response a id
            arrayIDResponse.push(i);//add les response du tweet dans un array
        }
    }
    return arrayIDResponse;
};

var HTagsFreq = function(){//objet pour htag et frequence (grosse array de tous les htags et frequences
    var arrayHTag = [];
    for(var i = 0; i<=tweets.length-1;i++){
        for(var j = 0; j<=tweets[i].Hashtags.length-1;j++){
        arrayHTag.push(tweets[i].Hashtags[j]);
        }
    }
    arrayHTag.sort();
    var HTagFreqArr = [];
    for(i=0;i<=arrayHTag.length-1;i++){
        var HTagFreq = [];
        HTagFreq.push(arrayHTag[i]);
        HTagFreq.push(this.getHTagFrequency(arrayHTag[i]));
  		HTagFreqArr.push(HTagFreq);
        i = i+(this.getHTagFrequency(arrayHTag[i]))-1;
    }
    this.HTagFreqArr = this.tribulle(HTagFreqArr);
};

HTagsFreq.prototype.tribulle = function(t){//classe l'array decroissante
    if (Array.isArray(t)) {
	var echange, passage = 1;
	do {
	    echange = false;
	    for (var i=0; i<t.length-passage; ++i)
		if (t[i][1] < t[i+1][1]) {
		    swap(t,i,i+1);
		    echange = true;
		}
	    
	    ++passage;
	} while (echange);

	return t;
    }
};

HTagsFreq.prototype.getHTags = function(nb){//getHTags
   return this.HTagFreqArr.slice(0,nb);
};

HTagsFreq.prototype.getHTagFrequency = function(htag){//getHTagFrequency
    var frequency = 0;
    for(var i =0; i<=tweets.length-1;i++){
        for(var j=0;j<=tweets[i].Hashtags.length-1;j++){
            if(tweets[i].Hashtags[j]===htag){
                ++frequency;
            }
        }
    }
    return frequency;
};

var test1= function(){//tests unitaires
   
    print(getTweetsEcrisPar("felipe"));
    print(getTweetsAvecHTag("columbus"));
    print(getTweetsEcrisParAuteurPopulaire(100));
    print(getTweetsEnReponseAuTweet("0002"));
    var tweeties= new HTagsFreq(tweets);
    var getHTagFreq1 = tweeties.getHTags(5);
    print(getHTagFreq1);
    var getFrequency1 = tweeties.getHTagFrequency("wtf");
    print(getFrequency1);
};
test1();

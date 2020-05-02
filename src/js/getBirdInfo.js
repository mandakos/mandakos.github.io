import fiBirdNames from '@/json/birdNamesFI.json';
import fiToSciBirdNames from '@/json/birdNamesFItoSCI.json';
import birdSpeciesInfo from '@/json/birdDescriptions.json';
import birdImageInfo from '@/json/birdImgAuthors.json';
import birdInfo from '@/json/birdInfo.json';

var parsedFI = fiBirdNames;
var parsedFItoSCI = fiToSciBirdNames;
var parsedSpecies = jsonToArray(birdSpeciesInfo);
var parsedImgInfo = jsonToArray(birdImageInfo);
var parsedbirdInfo = jsonToArray(birdInfo);

export function getBirdByName(speechResult) {
  if(speechResult) {
    var playAudio = false;
    // Count words in speech result and
    // if there's more than one, try to find if one
    // of them is bird species name
    var words = speechResult.split(' ').length;
    if(words > 1) {
      var resultArr = speechResult.split(" ");

      for(var i = 0; i < words; i++) {
        if (parsedFI.FIbirds.includes(resultArr[i])) {
          speechResult = resultArr[i];
        }
      }

      if (resultArr.includes("kuuntele")) {
        playAudio = true;
      }
    }

    // check if speechResult can be found in finnish bird names
    if(parsedFItoSCI.hasOwnProperty(speechResult)) {
      var sciName = parsedFItoSCI[speechResult];
      var fiName = speechResult;
      return returnInfo(fiName, sciName, playAudio);
    } 
    else {
      return getBirdByCharacteristics(speechResult);
    }
  }
  else {
    return false;
  }
}

export function getBirdByCharacteristics(speechResult) {
  var matches = new Map();
  var playAudio = false;

  if(speechResult) {
    var results = speechResult.split(" ");
    var count = results.length;
    if (results.includes("kuuntele")) {
      playAudio = true;
    }

    for(var j = 0; j < parsedbirdInfo.length; j++) {
      var matching = 0;

      for(var i = 0; i < count; i++) {
        var keys = Object.keys(parsedbirdInfo[j][1]);
        keys.forEach(function(key) {
          if(parsedbirdInfo[j][1][key].includes(results[i])) {
            matching++;
          }
        })
        matches.set(parsedbirdInfo[j][0], matching);
      }
    }
    //[...matches.entries()].sort((a, b) => a[1] - b[1]);

    var bestMatch = [...matches.entries()].reduce((a, e ) => e[1] > a[1] ? e : a);
    if(bestMatch[1] > 0) {
      var matchingBird = bestMatch[0].toLowerCase();

      // check if result can be found in finnish bird names
      if(parsedFItoSCI.hasOwnProperty(matchingBird)) {
        var sciName = parsedFItoSCI[matchingBird];
        var fiName = matchingBird;

        return returnInfo(fiName, sciName, playAudio);
      } 
      else {
        return false;
      }
    }
  }
  else {
    return false;
  }
}

function returnInfo(fiName, sciName, playAudio) {
  for(var i = 0; i < parsedSpecies.length; i++) {
    if(parsedSpecies[i][0] === sciName) {
      var birdDescText = parsedSpecies[i][1].post_content;
      var birdDescAuthor = parsedSpecies[i][1].post_author; 
    }
  }

  for(var i = 0; i < parsedImgInfo.length; i++) {
    if(parsedImgInfo[i][0] === sciName) {
      var birdImgInfo = {
        "authUrl" : parsedImgInfo[i][1][0].photographerUrl,
        "authName" : parsedImgInfo[i][1][0].PhotographerName,
        "srcUrl" : parsedImgInfo[i][1][0].imageSourceUrl,
        "imgName" : parsedImgInfo[i][1][0].imageName,
        "license" : parsedImgInfo[i][1][0].license
      }
    }
  }

  return {
    fiName: fiName,
    sciName: sciName,
    descText: birdDescText,
    descAuthor: birdDescAuthor,
    imgInfo: birdImgInfo,
    playAudio: playAudio
  }
}

function jsonToArray(json) {
  var arr = [];
  for(var i in json)
      arr.push([i,json[i]]);
  return arr;
}
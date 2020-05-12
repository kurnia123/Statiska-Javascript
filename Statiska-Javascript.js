
//*Variabel Penting
//data = data merupakan variabel penampung array data
//dataCentral 

//======================================================
//SORTING

let sorting = function (tampung) {
    let length = data.length
    let i = 0;
    let j = 0;
    let dataArray = tampung
    for(i=0; i< (length-1) ; i++) {
        for(j=0; j< (length-1); j++){
            if(dataArray[j] > dataArray[j+1]) {
                let tmp = dataArray[j+1]
                dataArray[j+1] = dataArray[j];
                dataArray[j] = tmp
            }
        }
    }
    return dataArray;
}
//======================================================

//Memasukkan Semua data observasi ke dalam kelas
//["Batas Bawah","Batas Atas","Banyak Data(F)","Tepi Bawah","Tepi Atas","Nilai Tengah","","Frekuensi Relatif","Fekuensi Kumulatif (<)","Fekuensi Kumulatif (>)"]

let kelasInterval = function (data) {
    //Menentukan Banyak Kelas
    let banyak_kelas = Math.round(1 + 3.3 * Math.log(data.length) / Math.LN10)

    console.log(`Banyak Kelas : ${banyak_kelas}`)
    
    //Menentukan Interval Kelas
    let R = data[data.length - 1] - data[0]
    let valueInterval = Math.ceil(R/banyak_kelas)

    console.log(`Kelas Interval : ${valueInterval}`)

    let tmp = []
    let val = data[0]
    let increment = 1
    while (val < data[data.length-1]) {
        let kk = val + valueInterval - 1

        let jumlahData = 0
        data.forEach((item) => {
            if((item >= val) && (item <= kk)){
                jumlahData++
            }
        })
        tmp[0] = ["Batas Bawah","Batas Atas","Banyak Data(F)","Tepi Bawah","Tepi Atas","Nilai Tengah","","Frekuensi Relatif","Fekuensi Kumulatif (<)","Fekuensi Kumulatif (>)"]
        //Tepi kelas Bawah dan Atas
        let nilaiTengah = (val + kk) / 2
        let tepiBawah = val - 0.5
        let tepiAtas = kk + 0.5    

        tmp[increment] = [val,kk,jumlahData,tepiBawah,tepiAtas,nilaiTengah,0,0]
        val = kk + 1
        increment++
    }
    
    //Distribusi Frekuensi Relatif dan Kumulatif
    let jumlahF = 0
    let jumlahFkumulatif = 0
    let i = 0
    let frekuensiKumulatif = 0
    for (i = 1; i < tmp.length ; i++) {
        jumlahF += tmp[i][2]
        if (typeof(tmp[i-1][2]) != "number") {
            tmp[i][7] = tmp[i][2]
            tmp[i][8] = tmp[7-i][7]
        } else {
            tmp[i][7] = tmp[i -1][7] + tmp[i][2]
            tmp[i][8] = tmp[i-1][8] - tmp[i-1][2]
        }
    }
    for (i = 1; i < tmp.length; i++) {
        if (typeof(tmp[i-1][2]) != "number") {
            tmp[i][8] = tmp[banyak_kelas + 1 - i][7]
        } else {
            tmp[i][8] = tmp[i-1][8] - tmp[i-1][2]
        }
    }
    //Frekuensi Realtif
    tmp.forEach((item,index) => {
        tmp[index][6] = Math.round((item[2]/jumlahF) * 100)
    })

    

    tmp.forEach(item => {
        console.log(item)
    })

    return tmp;
}


//======================================================
//MEAN

let mean = function(tabelData) {
    dataCentral[0][10] = "f * M (nilai tengah)"
    
    let jumlahFM = 0
    let jumlahF = 0
    let i = 0
    for (i = 1; i < tabelData.length; i++) {
        dataCentral[i][9] = dataCentral[i][2] * dataCentral[i][5]
        jumlahFM += dataCentral[i][9]
        jumlahF += dataCentral[i][2]
    }

    console.log("Mean : " + jumlahFM/jumlahF)
    return jumlahFM/jumlahF
}


//======================================================
//MEDIAN

let median = function(dataArray,classInterval) {
    let tengah = dataCentral[1][8] / 2
    
    let index = 0
    let i = 0
    for (i = 1; i < dataCentral.length; i++) {
        if (dataCentral[i][7] >= tengah) {
            index = i
            break;
        }
    }

    let result = dataCentral[index][3] + (((0.5*dataCentral[1][8]) - dataCentral[index-1][7])/dataCentral[index][2]) * classInterval
    console.log("Median : " + result)
    return result
}
//======================================================
//MODUS

let modus = function (dataArray,classInterval) {
    let index = 0
    let i = 0
    let pembanding = 0
    for (i = 1; i < dataCentral.length; i++) {
        if (pembanding <= dataCentral[i][2]) {
            pembanding = dataCentral[i][2]
            index = i;
        }
    }

    let d1 = 0

    if (typeof(dataCentral[index -1][2]) != "number") {
//         d1 = dataCentral[index][2] - dataCentral[index -1][2]
        d1 = dataCentral[index][2] - 0
    } else {
        d1 = dataCentral[index][2] - dataCentral[index -1][2]
    }

    
    let d2 = dataCentral[index][2] - dataCentral[index + 1][2]
    let result = dataCentral[index][3] + ( d1 / (d1 + d2)) * classInterval
    
    console.log("Modus : " + result)

    return result;
}
//======================================================

//======================================================
//QUARTIL

let quartil = function(quartil,dataArray,classInterval) {
    
    let valQuartil = quartil * dataCentral[1][8] / 4
    
    let index = 0
    let i = 0
    for (i = 1; i < dataCentral.length; i++) {
        if (dataCentral[i][7] >= valQuartil) {
            index = i
            break;
        }
    }

    let result = 0
    
    if (typeof(dataCentral[index-1][7]) != "number") {
        result = dataCentral[index][3] + (((quartil*dataCentral[1][8]/4) - 0)/dataCentral[index][2]) * classInterval
    } else {
        result = dataCentral[index][3] + (((quartil*dataCentral[1][8]/4) - dataCentral[index-1][7])/dataCentral[index][2]) * classInterval
    }

    console.log(`Quartil ${quartil} : ` + result)
    return result
}

//======================================================
//DESIL

let desil = function(desil,dataArray,classInterval) {
    
    let valDesil = desil * dataCentral[1][8] / 10
    
    let index = 0
    let i = 0
    for (i = 1; i < dataCentral.length; i++) {
        if (dataCentral[i][7] >= valDesil) {
            index = i
            break;
        }
    }

    let result = 0
    
    if (typeof(dataCentral[index-1][7]) != "number") {
        result = dataCentral[index][3] + (((desil*dataCentral[1][8]/10) - 0)/dataCentral[index][2]) * classInterval
    } else {
        result = dataCentral[index][3] + (((desil*dataCentral[1][8]/10) - dataCentral[index-1][7])/dataCentral[index][2]) * classInterval
    }
    
    console.log("Desil : " + result)
    return result
}

//======================================================
//Persentil

let persentil = function(persentil,dataArray,classInterval) {
    
    let valPersentil = persentil * dataCentral[1][8] / 100
    
    let result = 0
    let index = 0
    let i = 0
    for (i = 1; i < dataCentral.length; i++) {
        if (dataCentral[i][7] >= valPersentil) {
            index = i
            break;
        }
    }

    if (typeof(dataCentral[index-1][7]) != "number") {
        result = dataCentral[index][3] + (((persentil*dataCentral[1][8]/100) - 0)/dataCentral[index][2]) * classInterval
    } else {
        result = dataCentral[index][3] + (((persentil*dataCentral[1][8]/100) - dataCentral[index-1][7])/dataCentral[index][2]) * classInterval
    }

    
    console.log("Persentil : " + result)
    return result
}

//======================================================
//======================================================


//======================================================
//DEVIASI dan VARIANCE

let deviasi = function(dataArray) {
    let valueMean = mean(dataCentral)
    let zigma = 0
    
    dataCentral[0][11] = "Nilai Tengah - Mean"
    dataCentral[0][12] = "(M-Mean)^2"
    dataCentral[0][13] = "f * (M-Mean)^2"
    
    let i = 0
    for (i=1; i < dataCentral.length; i++) {
        dataCentral[i][10] = dataCentral[i][5] - valueMean
        dataCentral[i][11] = Math.pow(dataCentral[i][10],2)
        dataCentral[i][12] = dataCentral[i][2] * dataCentral[i][11]
        zigma += dataCentral[i][12]
    }

    let result = Math.sqrt(zigma/dataCentral[1][8])
    let result2 = zigma/dataCentral[1][8]
    console.log("Deviasi : " + result)
    console.log("Variance : " + result2)
    return result;
}

//======================================================
//SKEWNES

let skewness = function () {
    let rata = mean(dataCentral)
    let medians = median(dataCentral,10)
    let standarDeviasi = deviasi(dataCentral)

    let result = 3*(rata-medians) / standarDeviasi
    
    console.log("Skewnes : " + result)
    return result
}

//======================================================
//KURTOSIS

let kurtosis = function(dataArray) {
    let valueMean = mean(dataCentral)
    let zigma = 0
    
    dataCentral[0][14] = "(M-Mean)^2"
    dataCentral[0][15] = "f * (M-Mean)^2"
    
    let i = 0
    for (i=1; i < dataCentral.length; i++) {
        dataCentral[i][13] = Math.pow(dataCentral[i][10],4)
        dataCentral[i][14] = dataCentral[i][2] * dataCentral[i][13]
        zigma += dataCentral[i][14]
    }

    let result = 1/dataCentral[1][8] * (zigma) / Math.pow(deviasi(dataCentral),4)

    console.log("Kurtosis : " + result)
    return result;
}

//======================================================



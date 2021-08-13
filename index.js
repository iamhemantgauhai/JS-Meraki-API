const axios = require('axios');
const prompt = require('prompt-sync')();
axios.get("http://saral.navgurukul.org/api/courses").then(function (response) {
    var con = (response.data.availableCourses);
    console.log(con);
    let list = [];
    let c = 0;
    for (var i of con) {
        c++
        console.log(c, ":" + i.name)
        list.push(i.id)
    }
    let user = prompt('Choose the course!: ');
    var course_id = list[user - 1];
    axios.get("http://saral.navgurukul.org/api/courses/" + course_id + "/exercises").then(function (response) {
        let pa = (response.data.data);
        console.log(pa);
        var d = {};
        let count = 0;
        let slug_list = [];
        let child_slug_list = [];
        for (i of pa) {
            count++
            console.log(count, ":" + i.name)
            d[count] = i.slug
            let f = 1;
            let co = 0;
            for (v of i.childExercises) {
                slug_list.push(v.slug)
                console.log("  ", count + '.' + co, v.name)
                d[count + '.' + co] = v.slug
                co++
            }
            child_slug_list.push(i.slug)
        }

        console.log(d)
        let sl = prompt("Enter for parenet slug:");
        for (let i in d) {
            if (i == sl) {
                axios.get("http://saral.navgurukul.org/api/courses/" + course_id + "/exercise/getBySlug?slug=" + d[i]).then(function (data) {
                    var con = (data.data.content);
                    console.log(con);
                    let slug2 = JSON.parse(con);
                    console.log(slug2['content']);
                });
            }
        }
    });
});
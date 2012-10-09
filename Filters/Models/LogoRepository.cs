using System;
using System.Collections.Generic;

using FizzWare.NBuilder;

namespace Filters.Models
{
    public class LogoRepository
    {
        private static readonly List<string> descriptions; 
        private static readonly List<string> images; 
        private static readonly List<string> categories; 

        static LogoRepository()
        {
            descriptions = BuildDescriptions();
            images = BuildImages();
            categories = new List<string> { "Cars", "Consumer", "Comics", "Technology" };
        }

        public static IEnumerable<Logo> FindAll()
        {
            return Builder<Logo>.CreateListOfSize(100)
                    .All()
                        .With(l => l.Description = Pick<string>.RandomItemFrom(descriptions))
                        .And(l => l.ImageUrl = "https://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/" + Pick<string>.RandomItemFrom(images))
                        .And(l => l.Category = Pick<String>.RandomItemFrom(categories))
                    .Build();
        }

        private static List<string> BuildImages()
        {
            return new List<string>
                {
                    "082012/msft_logo_print.png",
                    "092012/windows8.png",
                    "082012/office_logo.png",
                    "052011/microsoft_.net_.png",
                    "042011/microsoft_outlook_2010.png",
                    "0014/4096/brand.gif",
                    "0003/9355/brand.gif",
                    "062010/Clipboard18.jpeg",
                    "052011/ie9_vector_cs5.png",
                    "0008/5774/brand.gif",
                    "032012/apple-converted.png",
                    "082012/apple.png",
                    "0025/2499/brand.gif",
                    "102011/apple_-_steve_jobs.ai_.png",
                    "112011/available_app_store.ai_.png",
                    "0021/3308/brand.gif",
                    "022012/itunes_logo_by_rony.jpg",
                    "062010/apple_ipad.gif",
                    "022011/ios_logo.png",
                    "0010/4855/brand.gif",
                    "082012/mustang-vectoriel.gif",
                    "0025/4143/brand.gif",
                    "0022/2860/brand.gif",
                    "072010/logo_fiesta_2009.gif",
                    "082010/ford_puma.gif",
                    "0022/5633/brand.gif",
                    "0021/7372/brand.gif",
                    "092012/hondaengines.jpg",
                    "022012/cr500logo_0.ai_.png",
                    "082011/pop100.jpg",
                    "072012/honda_vfr.jpg",
                    "082012/hornet_honda.jpg",
                    "072012/crv_logo_2012_preview.png",
                    "0016/0202/brand.gif",
                    "0013/4787/brand.gif",
                    "0020/3910/brand.gif",
                    "0006/4710/brand.gif",
                    "092010/coke-fishtail-logo.gif",
                    "0010/1790/brand.gif",
                    "0006/3536/brand.gif",
                    "0013/1127/brand.gif",
                    "0016/2894/brand.gif",
                    "0000/4227/brand.gif",
                    "0014/9425/brand.gif",
                    "0012/8945/brand.gif",
                    "032011/tab_logo.png",
                    "0017/9580/brand.gif",
                    "0010/7231/brand.gif",
                    "0021/2079/brand.gif",
                    "0019/1966/brand.gif",
                    "0011/1990/brand.gif",
                    "082012/walt_disney_pictures.png",
                    "042012/cars_2.png",
                    "0008/8055/brand.gif",
                    "0015/6357/brand.gif",
                    "052012/disney.png",
                    "0005/4613/brand.gif",
                    "082010/toy-story-3-logo.jpg",
                    "0023/0297/brand.gif",
                    "092012/spiderlogo-01.jpg",
                    "052012/avengers_movie_logo.png",
                    "0023/1246/brand.gif",
                    "0017/0599/brand.gif",
                    "0007/0621/brand.gif",
                    "022012/x-men_button_logo.jpg",
                    "0015/1337/brand.gif",
                    "112011/magneto_logo.ai_.png",
                    "012012/invincible_iron_man_logo.jpg",
                    "0012/4761/brand.gif",
                    "082010/logo_the_avengers.png",
                    "0024/4252/brand.gif",
                    "0018/2367/brand.gif",
                    "0015/2682/brand.gif",
                    "0015/1338/brand.gif",
                    "0013/7702/brand.gif",
                    "0014/8689/brand.gif",
                    "0010/7069/brand.gif",
                    "0010/7070/brand.gif",
                    "0008/3771/brand.gif",
                    "052012/dc-comics-logo.png",
                    "0012/8956/brand.gif",
                    "032012/dc_comics_1974.ai-converted.png",
                    "0007/0418/brand.gif",
                    "032012/batman_vintage_70s_logo_2.jpg",
                    "032012/batman_vintage_logo.jpg",
                    "032012/batman_tv_show_logo.jpg",
                    "032011/batman_logo.png",
                    "0008/3770/brand.gif",
                    "042011/batman_ac_3.png",
                    "032011/mds-robin.png",
                    "0012/8465/brand.gif",
                    "022011/untitled-1_87.png",
                    "0023/0821/brand.gif",
                    "0022/6844/brand.gif",
                    "0015/6766/brand.gif",
                    "0012/8386/brand.gif",
                    "0012/4959/brand.gif",
                    "0012/2393/brand.gif",
                    "0007/7667/brand.gif",
                    "0007/7031/brand.gif"   
                };
        }

        private static List<string> BuildDescriptions()
        {
            return new List<string>
                {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper, enim nec porttitor interdum, elit mauris tristique velit, a aliquam purus quam in odio. Aenean a accumsan mi. Proin at est massa. Proin luctus, dolor sit amet volutpat dignissim, erat ",
                    "elit fringilla dui, a fringilla magna diam vel justo. Fusce non arcu volutpat arcu aliquam varius. Sed elit metus, porttitor non cursus ut, varius eget tortor. Duis nec magna justo. Morbi adipiscing, metus ac ornare hendrerit, mi leo laoreet lectus, ut ",
                    "euismod massa ligula non nibh. Cras dui purus, accumsan vel molestie ut, interdum et augue. In vitae vestibulum neque. Quisque quis urna ac erat semper fringilla vitae sit amet diam. Phasellus ultrices, nisi nec vestibulum varius, eros purus varius ",
                    "arcu, id euismod sapien ante ac ante. Fusce non laoreet nibh. Ut a lacus ligula. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed tellus est, vehicula sed iaculis vel, dictum eget tellus.",
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Curabitur a feugiat nunc. Sed sed pretium lectus. Duis gravida quam pellentesque erat placerat facilisis et in nibh. Donec ac odio enim",
                    "am ullamcorper dignissim sapien, sit amet condimentum erat tempor nec. Nulla magna mi, tincidunt in adipiscing vitae, pellentesque ultrices dui. Fusce suscipit iaculis dolor, id blandit arcu pharetra ut. Suspendisse potenti. Nulla facilisi.",
                    "Ut id nisi nisl. Ut in mauris sit amet tortor feugiat vehicula. Proin eleifend convallis orci a viverra. Aenean vestibulum dictum tempus. Ut tempor neque nec ante laoreet luctus. Etiam quis mauris dictum arcu ultricies vehicula non sed nisi. Nulla nibh ",
                    "justo, euismod eu commodo eget, consequat eu neque. Quisque euismod accumsan lacinia. Sed elit leo, semper vel ornare id, pretium ac nisi.",
                    "Cras dictum sollicitudin nulla sed dignissim. Integer consectetur, dolor id dapibus interdum, mi tellus consequat dui, eu rutrum sem neque nec risus. Cras rutrum suscipit metus vel placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
                    "Vestibulum nec fermentum velit. Nulla vestibulum odio et elit ornare molestie. Pellentesque est nunc, ultricies a ornare venenatis, gravida vel velit.",
                    "Maecenas ut nunc neque, in facilisis nisl. Suspendisse nec quam libero, nec bibendum massa. Vivamus porta pellentesque ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi semper, erat eget ",
                    "volutpat rhoncus, eros magna facilisis mauris, eu imperdiet augue lacus et velit. Aliquam quis eros mi. In tempor ultrices tortor vitae adipiscing",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor volutpat condimentum. Donec cursus est in justo consectetur consequat. Duis rhoncus augue elementum risus facilisis ultrices adipiscing ligula fringilla. Vivamus egestas velit ",
                    "ac velit mollis vel porttitor turpis volutpat. Donec sapien diam, pretium non lobortis eget, mollis in libero. In quis ipsum sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec consequat, ligula vel placerat auctor, nisl odio fringilla mauris, in pulvinar purus nisi ut ipsum.",
                    "Fusce massa odio, lobortis sed gravida eu, posuere quis dolor. Curabitur condimentum augue eu sapien ornare imperdiet ac sit amet mi. Nam feugiat dapibus tellus a congue. Nunc nec quam mauris, quis tincidunt urna. Aliquam non scelerisque nibh. ",
                    "Nullam blandit dapibus dui, a hendrerit tellus auctor quis. Cras consectetur eros nec sapien tempor et scelerisque nisi pellentesque. Curabitur scelerisque dapibus nibh vitae convallis.",
                    "Fusce pellentesque pellentesque pulvinar. Aliquam non nibh ante, eu tincidunt augue. Phasellus neque justo, fermentum eget condimentum sit amet, mollis et est. Proin varius ante sit ",
                    "amet sem placerat hendrerit. Ut et lacinia lorem. Maecenas auctor, ipsum eu tincidunt euismod, tellus nisl pharetra est, non congue ante risus quis nisl. Nunc sed ligula lacus. ",
                    "Curabitur rhoncus nunc eget neque volutpat vitae congue velit lacinia. Quisque tempus ultrices dolor tristique cursus. Quisque sodales venenatis odio et sodales. Nam quis velit",
                    "ligula, id vestibulum orci. Suspendisse ut dolor quis nunc facilisis luctus. Vivamus non mollis metus. Donec quis pulvinar eros. Morbi orci justo, tempor ut porta nec, mattis nec enim.",
                    "Quisque lectus dolor, tempus vel rhoncus vitae, sollicitudin et tellus.In hac habitasse platea dictumst. Maecenas commodo risus nulla. Nullam eros magna, mollis non iaculis non, tempus in orci. ",
                    "Phasellus vel tortor nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dui arcu, semper vitae adipiscing egestas, bibendum at odio. ",
                    "Fusce et luctus est. Vivamus id quam eu augue bibendum tincidunt. Nunc tincidunt lorem id sapien sollicitudin rutrum. Aenean et nisi sit amet urna lobortis dignissim et eget quam. Aenean non mauris risus. Mauris imperdiet molestie venenatis. Nunc semper luctus nulla at mattis. Pellentesque nec convallis tortor. Integer eleifend ullamcorper urna non egestas.",
                    "Sed eu sapien enim. Nam pellentesque varius dolor ut gravida. Sed sit amet metus eu sapien volutpat vestibulum et nec est. Sed odio sem, consectetur vitae cursus ac, facilisis vel est. Quisque",
                    "faucibus bibendum urna, vel varius enim tempor ut. Morbi volutpat placerat erat, vitae consectetur tellus pellentesque nec. Nam sit amet libero sed risus iaculis dapibus vel sed erat.",
                    "Praesent pharetra tempus diam, id ullamcorper augue pretium non. Suspendisse eu elit libero, a luctus enim. Sed dignissim laoreet risus vel luctus. Mauris id pulvinar nulla. ",
                    "Vestibulum luctus nulla vitae dui sagittis eu tincidunt tellus vulputate. Nulla facilisi. Sed mauris nibh, vulputate mollis consequat at, volutpat vulputate tortor. Vestibulum vel vulputate lorem. ",
                    "Nunc ipsum nisl, venenatis et suscipit ultricies, egestas vel diam. Morbi fringilla erat id nulla ultricies blandit. Morbi eu purus arcu. Quisque aliquet pharetra placerat. Nulla et mauris lectus, ac cursus lectus. Suspendisse libero neque, facilisis vel tincidunt non, tincidunt in massa.",
                    "Aenean non tellus augue. Mauris volutpat, neque sit amet volutpat mattis, nisl dui cursus erat, a lacinia lectus massa in nisi. Sed tristique facilisis porta. Ut blandit adipiscing nisi ultricies ",
                    "vehicula. Donec ac leo quam. Vestibulum ut enim eleifend nibh sollicitudin ultrices. Quisque sed nunc felis, at blandit dui. Sed sed eros lectus. Donec nec mauris et erat sodales lacinia eget ac arcu. ",
                    "In non purus et lectus pharetra ornare vitae non risus. Pellentesque hendrerit ante in libero malesuada facilisis. Integer quis lorem vitae arcu volutpat rhoncus ac non lorem.",
                    "Suspendisse id tincidunt metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque porttitor, est in dictum ultrices, augue mi scelerisque quam, eu sollicitudin quam eros nec velit.",
                    "Vivamus tellus nibh, vehicula eu scelerisque ac, consequat id metus. Proin vitae augue eget augue posuere blandit facilisis sed lorem. Suspendisse ornare porttitor nulla, sed lobortis est hendrerit nec. Nunc in ornare nulla. Quisque feugiat iaculis neque at vestibulum. ",
                    "Nunc mi orci, ultricies quis rhoncus in, tempor vitae turpis. In dictum ullamcorper semper. Nullam varius sem a erat tempus lobortis. Nunc eget risus id nisi hendrerit fermentum. Mauris sit amet velit ipsum. Cras convallis purus eu purus porta hendrerit. ",
                    "Cras vitae turpis vitae tellus pulvinar volutpat sit amet non purus. Donec interdum vehicula tortor a euismod.",
                    "Pellentesque feugiat urna vitae dui feugiat sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras neque lorem, dapibus sed tincidunt id, fermentum vel arcu. Morbi arcu ante, vulputate in volutpat ut, volutpat ",
                    "nec orci. Quisque varius, enim vitae rutrum sollicitudin, risus sem mattis urna, et consequat libero velit id ligula. Suspendisse potenti. Nulla facilisi. Praesent facilisis scelerisque lorem ac molestie. Integer blandit odio id arcu auctor ac blandit dui convallis.",
                    "Aenean sit amet ante tellus, accumsan commodo nibh. Donec accumsan erat at justo porttitor cursus. Morbi interdum erat non ipsum iaculis sed lobortis felis vestibulum. Phasellus ut eros nec magna tempus congue. Nam tincidunt risus non ipsum rutrum ut ",
                    "placerat ligula pulvinar. Praesent erat lorem, venenatis at gravida at, faucibus vitae enim. Sed interdum imperdiet convallis. Proin et nibh auctor nulla eleifend mattis. Nullam nec odio neque, vitae dapibus velit. Etiam cursus gravida bibendum.",
                    "Phasellus eu lacinia sem. Praesent sit amet velit et purus facilisis faucibus at et risus. Proin et sem in eros fringilla rutrum. Nam hendrerit suscipit metus, eget tincidunt urna lobortis in. Phasellus lorem nisl, elementum vitae varius et, imperdiet in magna. ",
                    "Nullam eleifend libero laoreet felis lobortis tincidunt. Etiam ac sem at orci commodo fermentum quis vitae purus. Nam tempor placerat sapien, non eleifend nulla luctus at.",
                    "Nam dictum, dui sed tincidunt cursus, lectus mi tempus erat, id varius lectus lacus molestie ligula. Donec nulla quam, gravida non condimentum malesuada, fermentum et velit. ",
                    "Quisque pulvinar varius risus ac porta. Mauris lorem metus, interdum eget vestibulum quis, accumsan nec orci. Sed massa nibh, iaculis nec iaculis laoreet, luctus in sem. Phasellus pharetra viverra urna, eu aliquet augue vestibulum varius. Nulla facilisi. Vestibulum rutrum, mauris ac pharetra suscipit, ipsum massa vestibulum eros, vel feugiat nunc ante a velit.",
                    "Pellentesque ac quam at dui eleifend volutpat vitae ut tellus. Mauris semper vestibulum nisi, in pellentesque lectus hendrerit non. Nunc vulputate laoreet tellus sit amet condimentum. ",
                    "Nullam lobortis iaculis ante, nec consectetur elit posuere vitae. Aliquam sed mattis sapien. Nulla ac mi ornare massa ullamcorper tincidunt non non nunc. Phasellus risus enim, ",
                    "vestibulum vitae fermentum at, rutrum quis arcu. Cras vehicula, turpis a feugiat laoreet, leo diam molestie libero, eu pulvinar odio massa et justo. Vivamus at leo tortor.",
                    "Maecenas nisl quam, pharetra sit amet bibendum et, gravida sit amet justo. Quisque ut ornare odio. Maecenas nulla felis, fringilla vitae fringilla sit amet, consequat commodo erat. Donec dolor neque, viverra at molestie laoreet, varius quis nisl. ",
                    "Sed condimentum convallis nunc ac scelerisque. Vestibulum laoreet semper eros. Nullam luctus lorem quis tellus sagittis malesuada. Aenean vulputate dapibus nisi, ac vestibulum purus viverra sed. Sed id enim risus, quis molestie neque.",
                    "In neque arcu, viverra tempus aliquet nec, interdum at est. Donec sodales dolor ac lacus molestie vestibulum. Sed vel turpis vitae augue varius molestie sed semper ipsum. Pellentesque sed suscipit ligula. Aenean suscipit dapibus fermentum. ",
                    "Phasellus urna lorem, aliquam vel rhoncus a, volutpat semper nulla. Fusce aliquam rhoncus quam a ultricies. Vivamus felis turpis, sollicitudin a venenatis vitae, pellentesque at libero. Aliquam ac libero nulla, sed egestas dolor. ",
                    "Donec at velit vitae sem tempus tempus. Nullam et erat sit amet risus ultrices ullamcorper eu eget nibh.",
                    "Donec et tortor velit, nec venenatis est. Praesent arcu libero, tristique non volutpat commodo, molestie sit amet nibh. Donec arcu quam, facilisis vel egestas nec, posuere eu felis. ",
                    "Fusce sed leo diam. Phasellus eu gravida mi. Quisque ac turpis nec velit ultrices dictum dapibus vel massa. Suspendisse ultricies varius elit. Donec libero libero, iaculis vel suscipit sed, volutpat in arcu. ",
                    "Praesent erat orci, placerat vitae sollicitudin vitae, scelerisque a velit. Vestibulum id massa vel leo eleifend volutpat sit amet vel mi. Quisque porta, tortor eget luctus varius, erat lorem cursus arcu, id vestibulum arcu dolor eu mauris.",
                    "Sed ut erat eros, molestie vestibulum odio. Curabitur pretium gravida purus, venenatis hendrerit neque consequat at. Mauris quis elit velit. Suspendisse ut eros ut augue pulvinar viverra at in lacus. Nunc id tristique orci. ",
                    "Vestibulum consequat tortor volutpat augue venenatis lacinia. Mauris egestas commodo consequat. Maecenas nibh ante, rutrum eu varius ac, ornare congue erat. Aenean tristique gravida nisl, eu mattis purus congue ac. ",
                    "Nunc ut augue lorem, et mollis ante. Mauris aliquet lacus nec eros cursus vel dictum mauris placerat. Duis porttitor, tortor lobortis sagittis faucibus, augue leo tincidunt risus, quis molestie est urna non mi.",
                    "Suspendisse potenti. Curabitur pellentesque viverra condimentum. Maecenas aliquam dui sit amet ipsum condimentum in gravida nunc elementum. Maecenas dictum porttitor est ac iaculis. ",
                    "Duis justo ipsum, varius ac elementum et, hendrerit sed est. Curabitur quis risus nulla, ut euismod ante. Ut sapien velit, ultricies semper volutpat et, ultricies id lacus. ",
                    "Sed gravida tristique dictum. In hac habitasse platea dictumst. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla at lectus at metus malesuada facilisis at ac velit.",
                    "Curabitur ac est elit. Vivamus porttitor dictum vulputate. Nunc posuere turpis non sem tempor sodales. Aenean venenatis dolor a nisi porta vel scelerisque dolor cursus. ",
                    "Etiam tempor nunc id nisi vestibulum aliquam. Proin ac est libero, vel adipiscing mauris. Nam volutpat suscipit sem. Suspendisse nibh justo, vulputate sit amet egestas at, tincidunt vel nibh. ",
                    "Etiam eget libero risus. Suspendisse arcu enim, tempus tincidunt iaculis non, blandit quis massa. Aliquam sed purus nibh, non vestibulum sapien. Aliquam erat volutpat. ",
                    "Donec hendrerit pulvinar elit, eget eleifend nulla dictum adipiscing. Vestibulum non mi eu lorem luctus gravida eget sed nisl. Ut velit augue, lobortis et tempus vitae, semper adipiscing arcu. Nullam venenatis mi elit.",
                    "Nam dolor odio, blandit vel tincidunt eu, imperdiet in mi. Fusce ut venenatis ipsum. Integer sit amet dolor eget quam scelerisque mollis. Donec porttitor risus vitae nibh euismod fringilla. Donec hendrerit tempus odio non vulputate. ",
                    "Donec a urna velit, eget laoreet lorem. Mauris a erat erat, quis fermentum felis. Ut est lorem, fringilla sed aliquam ut, lobortis eu urna. Vivamus tristique sem tristique turpis dictum sed consequat risus posuere. Praesent pretium lorem vitae tellus consectetur commodo. ",
                    "Vestibulum aliquet, dolor et facilisis venenatis, dui lectus pulvinar quam, in faucibus diam sem et justo. Cras fringilla viverra urna ut bibendum. Ut massa eros, suscipit et faucibus sed, sollicitudin sit amet dui. Vestibulum sit amet turpis eros, eget dapibus sem."
                };
        }
    }
}
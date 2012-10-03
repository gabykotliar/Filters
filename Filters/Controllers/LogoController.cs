using System.Collections.Generic;
using System.Web.Http;

using Filters.Models;

namespace Filters.Controllers
{
    public class LogoController : ApiController
    {
        public IEnumerable<Logo> Get()
        {
            return LogoRepository.FindAll();
        }
    }
}

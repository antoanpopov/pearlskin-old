<ul id="menu">
	<li id="dashboard"><a href="{{ Url::to("/admin/dashboard")}}" title="{{ Lang::get("interface.home") }}"><i class="fa fa-dashboard fa-fw"></i> <span>{{ Lang::get("interface.home") }}</span></a></li>
	<li id="catalog"><a href="{{ Url::to("/admin/clients/")}}" title="{{ Lang::get("interface.clients") }}"><i class="fa fa-tags fa-fw"></i> <span><span>{{ Lang::get("interface.clients") }}</span></a></li>
	<li id="extension"><a href="{{ Url::to("/admin/procedures")}}" title="{{ Lang::get("interface.procedures") }}"><i class="fa fa-puzzle-piece fa-fw"></i> <span><span>{{ Lang::get("interface.procedures") }}</span></a></li>
	<li id="sale"><a href="{{ Url::to("/admin/doctors/")}}" title="{{ Lang::get("interface.home") }}"><i class="fa fa-shopping-cart fa-fw"></i> <span><span>{{ Lang::get("interface.doctors") }}</span></a></li>
	<li id="sale"><a href="{{ Url::to("/admin/manipulations/")}}" title="{{ Lang::get("interface.home") }}"><i class="fa fa-shopping-cart fa-fw"></i> <span><span>{{ Lang::get("interface.manipulations") }}</span></a></li>
	<li id="sale"><a href="{{ Url::to("/admin/references/")}}" title="{{ Lang::get("interface.home") }}"><i class="fa fa-shopping-cart fa-fw"></i> <span><span>{{ Lang::get("interface.references") }}</span></a></li>
</ul>
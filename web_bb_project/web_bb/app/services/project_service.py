from sqlalchemy import or_, and_
from app.models.projects import Projects

class ProjectService:
    @staticmethod
    def get_projects(search_input, index_action, limit=5, last_project_name=None):
        if index_action in [1, 3]:
            order = (Projects.date.desc(), Projects.name.desc())
        elif index_action in [2, 4]:
            order = (Projects.date.asc(), Projects.name.asc())
        else:
            return None
        
        search_filter = True
        if search_input:
            search_filter = or_(
                Projects.name.ilike(f'%{search_input}%'),
                Projects.description.ilike(f'%{search_input}%')
            )
        
        query = Projects.query.filter(search_filter)
        
        if last_project_name:
            last_project = Projects.query.filter_by(name=last_project_name).first()
            if not last_project:
                return None
            
            if index_action in [1, 3]:
                query = query.filter(
                    and_(
                        or_(
                            Projects.date < last_project.date,
                            and_(Projects.date == last_project.date, Projects.name < last_project.name)
                        ),
                        search_filter
                    )
                )
            else:
                query = query.filter(
                    and_(
                        or_(
                            Projects.date > last_project.date,
                            and_(Projects.date == last_project.date, Projects.name > last_project.name)
                        ),
                        search_filter
                    )
                )
        
        return query.order_by(*order).limit(limit).all()
    
    @staticmethod
    def projects_to_dict(projects):
        return {
            idx: {
                'name': project.name,
                'description': project.description,
                'date': project.date.strftime('%d.%m.%Y'),
                'image': project.image
            }
            for idx, project in enumerate(projects, start=1)
        }
from flask import Blueprint, request, jsonify
from app.services.project_service import ProjectService

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/achivm_ps', methods=['POST'])
def achivm_ps():
    data = request.json
    search_input = data.get('input', '').strip()
    index_action = data.get('index_action', 1)
    
    projects = ProjectService.get_projects(search_input, index_action)
    if projects is None:
        return jsonify({'status': 400, 'message': 'Invalid index_action'}), 400
    
    projects_data = ProjectService.projects_to_dict(projects)
    
    return jsonify({
        'status': 200,
        'message': 'Всё гуд',
        'flag_proj': 1,
        'projects': projects_data,
    }), 200

@bp.route('/more_achivm_ps', methods=['POST'])
def more_achivm_ps():
    data = request.json
    id_last_proj = data.get('id_last_proj')
    search_input = data.get('input', '').strip()
    index_action = data.get('index_action', 1)
    
    projects = ProjectService.get_projects(search_input, index_action, last_project_name=id_last_proj)
    if projects is None:
        return jsonify({'status': 404, 'message': 'Project not found'}), 404
    
    projects_data = ProjectService.projects_to_dict(projects)
    
    return jsonify({
        'status': 200,
        'message': 'Всё гуд',
        'flag_proj': 1 if projects_data else 0,
        'projects': projects_data,
    }), 200
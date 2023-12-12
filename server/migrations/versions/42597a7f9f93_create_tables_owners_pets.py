"""Create tables owners, pets

Revision ID: 42597a7f9f93
Revises: 
Create Date: 2023-12-12 15:47:09.682416

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42597a7f9f93'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('locationName', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('owners',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(), nullable=True),
    sa.Column('lastName', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('phoneNumber', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tenants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(), nullable=True),
    sa.Column('lastName', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('phoneNumber', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('unittypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('unitTypeName', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('contact', sa.Integer(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('apartments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('apartmentName', sa.String(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['owners.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('audittrails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('timein', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('timeout', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('units',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('unitName', sa.String(), nullable=True),
    sa.Column('apartment_id', sa.Integer(), nullable=True),
    sa.Column('unitType_id', sa.Integer(), nullable=True),
    sa.Column('unitStatus', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['apartment_id'], ['apartments.id'], ),
    sa.ForeignKeyConstraint(['unitType_id'], ['unittypes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('units')
    op.drop_table('audittrails')
    op.drop_table('apartments')
    op.drop_table('users')
    op.drop_table('unittypes')
    op.drop_table('tenants')
    op.drop_table('owners')
    op.drop_table('locations')
    # ### end Alembic commands ###
